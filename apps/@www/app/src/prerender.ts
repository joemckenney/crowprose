import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = "https://crowprose.com";

interface RouteMeta {
  title: string;
  description: string;
  image?: string;
}

// Define route metadata for SEO and Open Graph
const routeMeta: Record<string, RouteMeta> = {
  "/": {
    title: "Joe McKenney",
    description: "Software engineer. Building tools and writing about it.",
  },
  "/blog": {
    title: "Writing | Joe McKenney",
    description: "Essays and notes on software engineering, tooling, and building products.",
  },
  "/blog/wake": {
    title: "Wake: Terminal History for Claude Code",
    description: "A tool that records terminal sessions so Claude Code can see what you've been doing—the architecture decisions, PTY handling, and MCP integration.",
    image: "/og/wake.png",
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

// Define the routes to pre-render
const routes = Object.keys(routeMeta);

function generateMetaTags(route: string): string {
  const meta = routeMeta[route];
  if (!meta) return "";

  const url = `${SITE_URL}${route === "/" ? "" : route}`;
  const image = meta.image ? `${SITE_URL}${meta.image}` : `${SITE_URL}/og/default.png`;

  return `
    <title>${meta.title}</title>
    <meta name="description" content="${meta.description}" />
    <meta property="og:title" content="${meta.title}" />
    <meta property="og:description" content="${meta.description}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${meta.title}" />
    <meta name="twitter:description" content="${meta.description}" />
    <meta name="twitter:image" content="${image}" />`;
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

  console.log("Pre-rendering complete!");
}

prerender().catch((error) => {
  console.error("Pre-rendering failed:", error);
  process.exit(1);
});
