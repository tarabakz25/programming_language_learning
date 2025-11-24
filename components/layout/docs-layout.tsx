import { Sidebar } from "./sidebar";

interface DocsLayoutProps {
  children: React.ReactNode;
  language: string;
  sections: string[];
}

export function DocsLayout({ children, language, sections }: DocsLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar language={language} sections={sections} />
      <main className="flex-1 p-8 max-w-4xl mx-auto">
        <article className="prose prose-slate dark:prose-invert max-w-none">
          {children}
        </article>
      </main>
    </div>
  );
}

