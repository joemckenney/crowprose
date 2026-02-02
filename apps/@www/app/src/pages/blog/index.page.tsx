import { Tile } from "../../components/tile";
import { getAllPosts } from "../../lib/posts";
import {
	page,
	pageHeader,
	pageTitle,
	pageDescription,
	articleList,
} from "./index.css";

// External articles (not in our MDX content)
const externalArticles = [
	{
		title: "Open sourcing code from a private monorepo",
		description:
			"A practical guide to extracting and publishing code from private repositories while maintaining git history and proper attribution.",
		href: "https://hackernoon.com/open-sourcing-code-from-a-private-monorepo",
	},
	{
		title:
			"Building a modern gRPC-powered microservice using Node.js, TypeScript, and Connect",
		description:
			"Learn how to build modern microservices with type-safe gRPC using Connect, Node.js, and TypeScript.",
		href: "https://dev.to/joemckenney/building-a-modern-grpc-powered-microservice-using-nodejs-typescript-and-connect-51a9",
	},
];

export default function Blog() {
	// Get standalone posts (no series)
	const standalonePosts = getAllPosts().filter((p) => !p.series);

	return (
		<div className={page}>
			<header className={pageHeader}>
				<h1 className={pageTitle}>Writing</h1>
				<p className={pageDescription}>
					Essays and notes on software engineering, tooling, and building
					products.
				</p>
			</header>

			<div className={articleList}>
				<Tile
					title="Flight Patterns"
					description="Browser AI to production K8s. The long way around."
					href="/blog/flight-patterns"
				/>
				{standalonePosts.map((post) => (
					<Tile
						key={post.slug}
						title={post.title}
						description={post.description}
						href={post.slug}
					/>
				))}
				{externalArticles.map((article) => (
					<Tile
						key={article.href}
						title={article.title}
						description={article.description}
						href={article.href}
						external
					/>
				))}
			</div>
		</div>
	);
}
