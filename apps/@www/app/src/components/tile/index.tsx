import { Link } from "react-router-dom";
import { tile, tileLink, tileHeader, tileTitle, tileMetadata, tileDescription, tileLinks, tileLinkIcon } from "./index.css";

export interface TileLink {
  type: "github" | "npm" | "website";
  url: string;
}

interface Props {
  title: string;
  description: string;
  href?: string;
  metadata?: string;
  external?: boolean;
  links?: TileLink[];
}

const getLinkIcon = (type: TileLink["type"]) => {
  switch (type) {
    case "github":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>
      );
    case "npm":
      return (
        <svg width="16" height="16" viewBox="0 0 780 300" fill="currentColor">
          <path d="M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z M480,0v200h100V50h50v150h50V50h50v150h100V0H480z M0,200h100V50h50v150h50V0H0V200z"/>
        </svg>
      );
    case "website":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M2 12h20"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      );
  }
};

export function Tile(props: Props) {
  const content = (
    <article className={tile}>
      <header className={tileHeader}>
        <h3 className={tileTitle}>{props.title}</h3>
        {props.metadata && <div className={tileMetadata}>{props.metadata}</div>}
      </header>
      <p className={tileDescription}>{props.description}</p>
      {props.links && props.links.length > 0 && (
        <div className={tileLinks}>
          {props.links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className={tileLinkIcon}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.type}
              onClick={(e) => e.stopPropagation()}
            >
              {getLinkIcon(link.type)}
            </a>
          ))}
        </div>
      )}
    </article>
  );

  // If links are provided, don't wrap the whole tile in a link
  if (props.links && props.links.length > 0) {
    return content;
  }

  if (props.external && props.href) {
    return (
      <a
        href={props.href}
        className={tileLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  if (props.href) {
    return (
      <Link to={props.href} className={tileLink}>
        {content}
      </Link>
    );
  }

  return content;
}
