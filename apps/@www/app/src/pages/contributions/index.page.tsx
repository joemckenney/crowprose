import { Tile } from "../../components/tile";
import { page, pageHeader, pageTitle, pageDescription, contributionList } from "./index.css";

export default function Contributions() {
  return (
    <div className={page}>
      <header className={pageHeader}>
        <h1 className={pageTitle}>Open Source Contributions</h1>
        <p className={pageDescription}>
          Contributing to the open source ecosystem through bug fixes, features, and improvements.
        </p>
      </header>

      <div className={contributionList}>
        <Tile
          title="Node.js Corepack"
          description="Updated pnpm tests to use current version of the package manager"
          href="https://github.com/nodejs/corepack/pull/621"
          metadata="Closed · Feb 2025"
          external
        />
        <Tile
          title="Unbuild"
          description="Added experimental active watcher for rollup to improve development experience"
          href="https://github.com/unjs/unbuild/pull/364"
          metadata="Merged · Jun 2024"
          external
        />
        <Tile
          title="coc-prettier"
          description="Upgraded prettier version to 3.x.x for latest features and improvements"
          href="https://github.com/neoclide/coc-prettier/pull/172"
          metadata="Merged · Mar 2024"
          external
        />
        <Tile
          title="Yarn (Berry)"
          description="Made workspace resolution respect gitignored files and directories"
          href="https://github.com/yarnpkg/berry/pull/4574"
          metadata="Closed · Jul 2022"
          external
        />
        <Tile
          title="next-mdx-remote"
          description="Loosened frontmatter type constraints and made it configurable"
          href="https://github.com/hashicorp/next-mdx-remote/pull/283"
          metadata="Merged · Jul 2022"
          external
        />
      </div>
    </div>
  );
}
