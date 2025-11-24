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
  const source = await serialize(fileContents, {
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
      title: section,
    },
  };
}

