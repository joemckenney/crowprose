import { Link } from "react-router-dom";
import { page, header, title, description, postList, postItem, postTitle, postDescription } from "./index.css";

const posts = [
  {
    slug: "db-cli",
    title: "A Multi-Environment Database CLI",
    description: "One command to access local, minikube, and production databases. Config discovery, Kubernetes secret reading, and why Bun makes CLI tools fun to write.",
  },
  // Future posts:
  // {
  //   slug: "sdk-generation",
  //   title: "Spec Packages as Contracts",
  //   description: "How services generate OpenAPI specs that feed into typed client libraries without circular dependencies.",
  // },
];

export default function FlightPatterns() {
  return (
    <div className={page}>
      <header className={header}>
        <h1 className={title}>Flight Patterns</h1>
        <p className={description}>
          Browser AI to production K8s.{" "}
          <a href="https://github.com/joemckenney/website">The long way around</a>.
        </p>
      </header>

      <ul className={postList}>
        {posts.map((post) => (
          <li key={post.slug} className={postItem}>
            <Link to={`/blog/flight-patterns/${post.slug}`}>
              <span className={postTitle}>{post.title}</span>
              <span className={postDescription}>{post.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
