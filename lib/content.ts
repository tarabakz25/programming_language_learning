import fs from "fs";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

const contentDirectory = path.join(process.cwd(), "content");

export interface ContentMetadata {
  language: string;
  section: string;
  title: string;
  description?: string;
}

export interface SectionMeta {
  slug: string;
  title: string;
  description?: string;
  order: number;
}

/**
 * Parse frontmatter from MDX file content
 * Supports YAML frontmatter format: ---\nkey: value\n---
 */
function parseFrontmatter(content: string): {
  frontmatter: Record<string, unknown>;
  body: string;
} {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, body: content };
  }

  const frontmatterText = match[1];
  const body = match[2];

  const frontmatter: Record<string, unknown> = {};
  const lines = frontmatterText.split("\n");

  for (const line of lines) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // Remove quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    // Try to parse as number
    if (/^\d+$/.test(value)) {
      frontmatter[key] = parseInt(value, 10);
    } else {
      frontmatter[key] = value;
    }
  }

  return { frontmatter, body };
}

/**
 * Convert section slug to readable title
 */
function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function getLanguages(): Promise<string[]> {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }
  const entries = fs.readdirSync(contentDirectory, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

export async function getSections(language: string): Promise<string[]> {
  const languageDir = path.join(contentDirectory, language);
  if (!fs.existsSync(languageDir)) {
    return [];
  }
  const entries = fs.readdirSync(languageDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name.replace(".mdx", ""));
}

/**
 * Get section metadata with order, title, and description from frontmatter
 * Falls back to slug-based title and alphabetical order if frontmatter is missing
 */
export async function getSectionMetas(language: string): Promise<SectionMeta[]> {
  const languageDir = path.join(contentDirectory, language);
  if (!fs.existsSync(languageDir)) {
    return [];
  }

  const entries = fs.readdirSync(languageDir, { withFileTypes: true });
  const mdxFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => ({
      slug: entry.name.replace(".mdx", ""),
      path: path.join(languageDir, entry.name),
    }));

  const metas: SectionMeta[] = [];

  for (const file of mdxFiles) {
    const fileContents = fs.readFileSync(file.path, "utf8");
    const { frontmatter } = parseFrontmatter(fileContents);

    const title =
      (typeof frontmatter.title === "string" ? frontmatter.title : null) ||
      slugToTitle(file.slug);
    const description =
      typeof frontmatter.description === "string" ? frontmatter.description : undefined;
    const order =
      typeof frontmatter.order === "number"
        ? frontmatter.order
        : mdxFiles.indexOf(file);

    metas.push({
      slug: file.slug,
      title,
      description,
      order,
    });
  }

  // Sort by order, then by slug if order is the same
  return metas.sort((a, b) => {
    if (a.order !== b.order) {
      return a.order - b.order;
    }
    return a.slug.localeCompare(b.slug);
  });
}

export async function getContent(
  language: string,
  section: string
): Promise<{
  source: Awaited<ReturnType<typeof serialize>>;
  metadata: ContentMetadata;
}> {
  const filePath = path.join(contentDirectory, language, `${section}.mdx`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Content not found: ${language}/${section}`);
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { frontmatter, body } = parseFrontmatter(fileContents);

  const title =
    (typeof frontmatter.title === "string" ? frontmatter.title : null) ||
    slugToTitle(section);
  const description =
    typeof frontmatter.description === "string" ? frontmatter.description : undefined;

  // Serialize only the body (without frontmatter) for MDX rendering
  const source = await serialize(body, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight, rehypeRaw],
    },
  });

  return {
    source,
    metadata: {
      language,
      section,
      title,
      description,
    },
  };
}

