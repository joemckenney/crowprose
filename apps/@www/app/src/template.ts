import path from "node:path";
import fs from "node:fs";

import { fileURLToPath } from "node:url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const template = fs.readFileSync(
	path.resolve(__dirname, "../client/index.html"),
	"utf8",
);

interface TemplateProps {
	html: string;
}

export default {
	render: ({ html }: TemplateProps) =>
		template.replace("<!--app-html-->", html),
};
