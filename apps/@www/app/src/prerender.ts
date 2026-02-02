import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = "https://crowprose.com";
const AUTHOR_NAME = "Joe McKenney";

interface RouteMeta {
	title: string;
	description: string;
	image?: string;
	// Blog-specific metadata
	type?: "article" | "website";
	publishedTime?: string;
	modifiedTime?: string;
}

// Static route metadata for non-MDX pages
const staticRouteMeta: Record<string, RouteMeta> = {
	"/": {
		title: "Joe McKenney",
		description: "Software engineer. Building tools and writing about it.",
	},
	"/blog": {
		title: "Writing | Joe McKenney",
		description:
			"Essays and notes on software engineering, tooling, and building products.",
	},
	"/blog/wake": {
		title: "Wake: Terminal History for Claude Code",
		description:
			"A tool that records terminal sessions so Claude Code can see what you've been doing—the architecture decisions, PTY handling, and MCP integration.",
		image: "/og/wake.png",
		type: "article",
		publishedTime: "2025-01-20",
		modifiedTime: "2025-01-20",
	},
	"/blog/flight-patterns": {
		title: "Flight Patterns | Joe McKenney",
		description: "Browser AI to production K8s. The long way around.",
	},
	"/projects": {
		title: "Projects | Joe McKenney",
		description: "Open source projects and side work.",
	},
	"/contributions": {
		title: "Contributions | Joe McKenney",
		description: "Open source contributions and community involvement.",
	},
};

// Format date as ISO date string (YYYY-MM-DD)
function formatDate(date: unknown): string | undefined {
	if (!date) return undefined;
	if (date instanceof Date) {
		return date.toISOString().split("T")[0];
	}
	if (typeof date === "string") {
		return date;
	}
	return undefined;
}

// Discover MDX files and extract frontmatter
function discoverMdxPosts(srcDir: string): Record<string, RouteMeta> {
	const mdxMeta: Record<string, RouteMeta> = {};
	const pagesDir = path.join(srcDir, "pages", "blog");

	function walkDir(dir: string) {
		if (!fs.existsSync(dir)) return;

		const entries = fs.readdirSync(dir, { withFileTypes: true });
		for (const entry of entries) {
			const fullPath = path.join(dir, entry.name);
			if (entry.isDirectory()) {
				walkDir(fullPath);
			} else if (entry.name.endsWith(".mdx")) {
				const content = fs.readFileSync(fullPath, "utf-8");
				const { data } = matter(content);

				if (data.title && data.description) {
					// Convert file path to route
					const relativePath = path.relative(
						path.join(srcDir, "pages"),
						fullPath,
					);
					const route = `/${relativePath.replace(/\.mdx$/, "")}`;

					const publishedTime = formatDate(data.publishedTime);
					const modifiedTime = formatDate(data.modifiedTime) || publishedTime;

					mdxMeta[route] = {
						title: data.title,
						description: data.description,
						image: data.image,
						type: "article",
						publishedTime,
						modifiedTime,
					};
				}
			}
		}
	}

	walkDir(pagesDir);
	return mdxMeta;
}

// Build complete route metadata by merging static and MDX-discovered routes
function buildRouteMeta(srcDir: string): Record<string, RouteMeta> {
	const mdxMeta = discoverMdxPosts(srcDir);
	return { ...staticRouteMeta, ...mdxMeta };
}

// Get the source directory (relative to the prerender script location in dist/server/)
const srcDir = path.resolve(__dirname, "..", "..", "src");
const routeMeta = buildRouteMeta(srcDir);

// Define the routes to pre-render
const routes = Object.keys(routeMeta);

function generateJsonLd(
	route: string,
	meta: RouteMeta,
	url: string,
	image: string,
): string {
	const isArticle = meta.type === "article";

	if (isArticle) {
		const articleSchema = {
			"@context": "https://schema.org",
			"@type": "BlogPosting",
			headline: meta.title,
			description: meta.description,
			image: image,
			url: url,
			author: {
				"@type": "Person",
				name: AUTHOR_NAME,
				url: SITE_URL,
			},
			publisher: {
				"@type": "Person",
				name: AUTHOR_NAME,
				url: SITE_URL,
			},
			datePublished: meta.publishedTime,
			dateModified: meta.modifiedTime || meta.publishedTime,
			mainEntityOfPage: {
				"@type": "WebPage",
				"@id": url,
			},
		};
		return `<script type="application/ld+json">${JSON.stringify(articleSchema)}</script>`;
	}

	// Default website schema
	const websiteSchema = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: AUTHOR_NAME,
		url: SITE_URL,
		author: {
			"@type": "Person",
			name: AUTHOR_NAME,
		},
	};
	return `<script type="application/ld+json">${JSON.stringify(websiteSchema)}</script>`;
}

function generateMetaTags(route: string): string {
	const meta = routeMeta[route];
	if (!meta) return "";

	const url = `${SITE_URL}${route === "/" ? "" : route}`;
	const image = meta.image
		? `${SITE_URL}${meta.image}`
		: `${SITE_URL}/og/default.png`;
	const isArticle = meta.type === "article";

	let tags = `
    <title>${meta.title}</title>
    <meta name="description" content="${meta.description}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:title" content="${meta.title}" />
    <meta property="og:description" content="${meta.description}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:type" content="${isArticle ? "article" : "website"}" />
    <meta property="og:site_name" content="${AUTHOR_NAME}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${meta.title}" />
    <meta name="twitter:description" content="${meta.description}" />
    <meta name="twitter:image" content="${image}" />`;

	// Add article-specific meta tags
	if (isArticle) {
		if (meta.publishedTime) {
			tags += `\n    <meta property="article:published_time" content="${meta.publishedTime}" />`;
		}
		if (meta.modifiedTime) {
			tags += `\n    <meta property="article:modified_time" content="${meta.modifiedTime}" />`;
		}
		tags += `\n    <meta property="article:author" content="${AUTHOR_NAME}" />`;
	}

	// Add JSON-LD structured data
	tags += `\n    ${generateJsonLd(route, meta, url, image)}`;

	return tags;
}

async function prerender() {
	// Import the built server-side render function
	const { render } = await import("./entry-server.js");

	// Resolve paths relative to the dist/server directory
	const distDir = path.resolve(__dirname, "..");
	const clientDir = path.join(distDir, "client");

	// Read the client index.html template
	const templatePath = path.join(clientDir, "index.html");
	const template = fs.readFileSync(templatePath, "utf-8");

	// Pre-render each route
	for (const route of routes) {
		try {
			// Render the route to HTML
			const appHtml = render(route);

			// Generate meta tags for this route
			const metaTags = generateMetaTags(route);

			// Replace placeholders with content
			const html = template
				.replace("<!--app-html-->", appHtml)
				.replace("<!--meta-tags-->", metaTags);

			// Determine the output path
			let filePath: string;
			if (route === "/") {
				filePath = path.join(clientDir, "index.html");
			} else {
				// Create directory for the route
				const routePath = path.join(clientDir, route);
				fs.mkdirSync(routePath, { recursive: true });
				filePath = path.join(routePath, "index.html");
			}

			// Write the pre-rendered HTML
			fs.writeFileSync(filePath, html);
			console.log(`Pre-rendered: ${route} -> ${filePath}`);
		} catch (error) {
			console.error(`Failed to pre-render ${route}:`, error);
		}
	}

	// Generate sitemap.xml
	generateSitemap(clientDir);

	console.log("Pre-rendering complete!");
}

function generateSitemap(clientDir: string): void {
	const today = new Date().toISOString().split("T")[0];

	const urls = routes.map((route) => {
		const meta = routeMeta[route];
		const loc = route === "/" ? SITE_URL : `${SITE_URL}${route}`;
		const lastmod = meta?.modifiedTime || today;
		const priority =
			route === "/"
				? "1.0"
				: route === "/blog"
					? "0.9"
					: route.startsWith("/blog/")
						? "0.8"
						: "0.7";
		const changefreq = route.startsWith("/blog/") ? "monthly" : "weekly";

		return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
	});

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

	const sitemapPath = path.join(clientDir, "sitemap.xml");
	fs.writeFileSync(sitemapPath, sitemap);
	console.log(`Generated: ${sitemapPath}`);
}

prerender().catch((error) => {
	console.error("Pre-rendering failed:", error);
	process.exit(1);
});
