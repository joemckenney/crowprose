import { Link } from "react-router-dom";
import { Tile } from "../components/tile";
import { SocialLinks } from "../components/social-links";
import {
  page,
  masthead,
  brand,
  tagline,
  section,
  sectionHeader,
  sectionTitle,
  sectionLink,
  tileGrid,
} from "./index.css";

function App() {
  return (
    <div className={page}>
      <header className={masthead}>
        <h1 className={brand}>Crowprose</h1>
        <p className={tagline}>
          Software engineer, animal dad, husband, and lifelong athlete.
          Building tools and sharing thoughts on software development.
        </p>
        <SocialLinks />
      </header>

      <section className={section}>
        <div className={sectionHeader}>
          <h2 className={sectionTitle}>Projects</h2>
          <Link to="/projects" className={sectionLink}>
            View all →
          </Link>
        </div>
        <div className={tileGrid}>
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
            title="Mercator"
            description="A map implementation that allows for objects as keys without key equality constraints."
            links={[
              { type: "npm", url: "https://www.npmjs.com/package/@dopt/mercator" }
            ]}
          />
        </div>
      </section>

      <section className={section}>
        <div className={sectionHeader}>
          <h2 className={sectionTitle}>Writing</h2>
          <Link to="/blog" className={sectionLink}>
            View all →
          </Link>
        </div>
        <div className={tileGrid}>
          <Tile
            title="Open sourcing code from a private monorepo"
            description="A practical guide to extracting and publishing code from private repositories while maintaining git history."
            href="https://hackernoon.com/open-sourcing-code-from-a-private-monorepo"
            external
          />
          <Tile
            title="Building a modern gRPC-powered microservice"
            description="Learn how to build modern microservices with type-safe gRPC using Connect, Node.js, and TypeScript."
            href="https://dev.to/joemckenney/building-a-modern-grpc-powered-microservice-using-nodejs-typescript-and-connect-51a9"
            external
          />
        </div>
      </section>

      <section className={section}>
        <div className={sectionHeader}>
          <h2 className={sectionTitle}>Open Source Contributions</h2>
          <Link to="/contributions" className={sectionLink}>
            View all →
          </Link>
        </div>
        <div className={tileGrid}>
          <Tile
            title="Node.js Corepack"
            description="Updated pnpm tests to use current version of the package manager"
            href="https://github.com/nodejs/corepack/pull/621"
            metadata="Closed · Feb 2025"
            contributionType="pr"
            external
          />
          <Tile
            title="Unbuild"
            description="Build configuration array fails on export validation when writing to same dist directory"
            href="https://github.com/unjs/unbuild/issues/356"
            metadata="Open · Jan 2024"
            contributionType="issue"
            external
          />
          <Tile
            title="Turbo"
            description="Specific packages in monorepo take extremely long time to build with cache hits"
            href="https://github.com/vercel/turbo/issues/2069"
            metadata="Closed · Sep 2022"
            contributionType="issue"
            external
          />
        </div>
      </section>
    </div>
  );
}

export default App;
