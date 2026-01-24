import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Define the routes to pre-render
const routes = [
  "/",
  "/blog",
  "/blog/wake",
  "/projects",
  "/contributions",
];

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

      // Replace the placeholder with the rendered HTML
      const html = template.replace("<!--app-html-->", appHtml);

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
