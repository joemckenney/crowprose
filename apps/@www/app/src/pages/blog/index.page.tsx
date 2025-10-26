import { Tile } from "../../components/tile";
import { page, pageHeader, pageTitle, pageDescription, articleList } from "./index.css";

export default function Blog() {
  return (
    <div className={page}>
      <header className={pageHeader}>
        <h1 className={pageTitle}>Writing</h1>
        <p className={pageDescription}>
          Essays and notes on software engineering, tooling, and building products.
        </p>
      </header>

      <div className={articleList}>
        <Tile
          title="Open sourcing code from a private monorepo"
          description="A practical guide to extracting and publishing code from private repositories while maintaining git history and proper attribution."
          href="https://hackernoon.com/open-sourcing-code-from-a-private-monorepo"
          external
        />
        <Tile
          title="Building a modern gRPC-powered microservice using Node.js, TypeScript, and Connect"
          description="Learn how to build modern microservices with type-safe gRPC using Connect, Node.js, and TypeScript."
          href="https://dev.to/joemckenney/building-a-modern-grpc-powered-microservice-using-nodejs-typescript-and-connect-51a9"
          external
        />
      </div>
    </div>
  );
}
