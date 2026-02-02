import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { page, header, title, article, seriesTag, seriesLink } from "./index.css";

const SERIES_NAMES: Record<string, string> = {
  "flight-patterns": "Flight Patterns",
};

interface MdxLayoutProps {
  children: ReactNode;
  frontmatter: {
    title: string;
    description?: string;
    publishedTime?: string;
    series?: string;
  };
}

export function MdxLayout({ children, frontmatter }: MdxLayoutProps) {
  const seriesSlug = frontmatter.series;
  const seriesName = seriesSlug ? SERIES_NAMES[seriesSlug] : null;

  return (
    <div className={page}>
      <header className={header}>
        {seriesName && seriesSlug && (
          <Link to={`/blog/${seriesSlug}`} className={seriesLink}>
            <span className={seriesTag}>{seriesName}</span>
          </Link>
        )}
        <h1 className={title}>{frontmatter.title}</h1>
      </header>

      <article className={article}>
        {children}
      </article>
    </div>
  );
}
