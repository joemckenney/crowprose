import { Link } from "react-router-dom";
import { getSeriesPosts } from "../../../lib/posts";
import {
	page,
	header,
	title,
	description,
	postList,
	postItem,
	postTitle,
	postDescription,
} from "./index.css";

export default function FlightPatterns() {
	const posts = getSeriesPosts("flight-patterns");

	return (
		<div className={page}>
			<header className={header}>
				<h1 className={title}>Flight Patterns</h1>
				<p className={description}>
					Browser AI to production K8s.{" "}
					<a href="https://github.com/joemckenney/website">
						The long way around
					</a>
					.
				</p>
			</header>

			<ul className={postList}>
				{posts.map((post) => (
					<li key={post.slug} className={postItem}>
						<Link to={post.slug}>
							<span className={postTitle}>{post.title}</span>
							<span className={postDescription}>{post.description}</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
