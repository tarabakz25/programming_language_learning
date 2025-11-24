import { MDXRemote } from "next-mdx-remote/rsc";
import { Quiz } from "@/components/quiz";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const components = {
  Quiz,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-3xl font-semibold mt-6 mb-3" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-2xl font-semibold mt-4 mb-2" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 leading-7" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-7" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => {
    const isInline = !props.className;
    return isInline ? (
      <code
        className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono"
        {...props}
      />
    ) : (
      <code {...props} />
    );
  },
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="bg-muted p-4 rounded-lg overflow-x-auto mb-4"
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-primary pl-4 italic my-4"
      {...props}
    />
  ),
  a: (props: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-primary underline underline-offset-4" {...props} />
  ),
};

export function MDXContent({
  source,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  source: any;
}) {
  return <MDXRemote source={source} components={components} />;
}

