import { Tile } from "../../components/tile";
import { page, pageHeader, pageTitle, pageDescription, contributionList } from "./index.css";

export default function Contributions() {
  return (
    <div className={page}>
      <header className={pageHeader}>
        <h1 className={pageTitle}>Open Source Contributions</h1>
        <p className={pageDescription}>
          Contributing to the open source ecosystem through pull requests, bug reports, and feature requests.
        </p>
      </header>

      <div className={contributionList}>
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
          title="Unbuild"
          description="Added experimental active watcher for rollup to improve development experience"
          href="https://github.com/unjs/unbuild/pull/364"
          metadata="Merged · Jun 2024"
          contributionType="pr"
          external
        />
        <Tile
          title="coc-prettier"
          description="Upgraded prettier version to 3.x.x for latest features and improvements"
          href="https://github.com/neoclide/coc-prettier/pull/172"
          metadata="Merged · Mar 2024"
          contributionType="pr"
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
        <Tile
          title="Yarn (Berry)"
          description="Workspace globbing does not respect gitignored files/dirs"
          href="https://github.com/yarnpkg/berry/issues/4572"
          metadata="Closed · Jul 2022"
          contributionType="issue"
          external
        />
        <Tile
          title="Yarn (Berry)"
          description="Made workspace resolution respect gitignored files and directories"
          href="https://github.com/yarnpkg/berry/pull/4574"
          metadata="Closed · Jul 2022"
          contributionType="pr"
          external
        />
        <Tile
          title="next-mdx-remote"
          description="Loosened frontmatter type constraints and made it configurable"
          href="https://github.com/hashicorp/next-mdx-remote/pull/283"
          metadata="Merged · Jul 2022"
          contributionType="pr"
          external
        />
        <Tile
          title="Vanilla Extract"
          description="Regression in Styling API produces colliding class names"
          href="https://github.com/vanilla-extract-css/vanilla-extract/issues/672"
          metadata="Closed · May 2022"
          contributionType="issue"
          external
        />
        <Tile
          title="next-seo"
          description="NextSeo doesn't render tags in heads on SSR in React 18"
          href="https://github.com/garmeeh/next-seo/issues/945"
          metadata="Closed · Apr 2022"
          contributionType="issue"
          external
        />
      </div>
    </div>
  );
}
