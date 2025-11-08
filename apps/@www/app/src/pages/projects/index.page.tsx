import { Tile } from "../../components/tile";
import { page, pageHeader, pageTitle, pageDescription, projectGrid } from "./index.css";

export default function Projects() {
  return (
    <div className={page}>
      <header className={pageHeader}>
        <h1 className={pageTitle}>Projects</h1>
        <p className={pageDescription}>
          Open source tools and libraries for TypeScript, monorepos, and developer tooling.
        </p>
      </header>

      <div className={projectGrid}>
        <Tile
          title="Weather station"
          description="Experience your local weather as an AI-generated ambient soundscape. Uses Chrome's built-in AI to interpret real-time weather data into unique Web Audio synthesis."
          links={[
            { type: "website", url: "https://joemckenney.com" }
          ]}
        />
        <Tile
          title="Pkg-tools"
          description="An opinionated TypeScript package build toolchain with typed configuration for modern development workflows."
          links={[
            { type: "github", url: "https://github.com/pkg-tools/pkg-tools" },
            { type: "website", url: "https://www.pkgtools.com/" },
            { type: "npm", url: "https://www.npmjs.com/settings/pkg-tools/packages" }
          ]}
        />
        <Tile
          title="Please"
          description="A CLI for developing in monorepos, not building them. Focused on developer experience and productivity."
          links={[
            { type: "npm", url: "https://www.npmjs.com/package/@dopt/please" }
          ]}
        />
        <Tile
          title="Coc-package-json"
          description="A coc plugin for linting/formatting/sorting your package.json"
          links={[
            { type: "github", url: "https://github.com/joemckenney/coc-package-json" }
          ]}
        />
        <Tile
          title="10 Print Chars"
          description="A creative coding homage to the classic 10 PRINT algorithm"
          links={[
            { type: "github", url: "https://github.com/joemckenney/10printchars" }
          ]}
        />
        <Tile
          title="Clandestine"
          description="Modern multi-language monorepo setup"
          links={[
            { type: "github", url: "https://github.com/joemckenney/clandestine" }
          ]}
        />
        <Tile
          title="Mercator"
          description="A map implementation that allows for objects as keys without key equality constraints."
          links={[
            { type: "npm", url: "https://www.npmjs.com/package/@dopt/mercator" }
          ]}
        />
        <Tile
          title="Other Open Source packages from Dopt"
          description="Collection of open source packages and tools developed at Dopt"
          links={[
            { type: "npm", url: "https://www.npmjs.com/settings/dopt/packages" }
          ]}
        />
      </div>
    </div>
  );
}
