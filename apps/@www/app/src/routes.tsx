import { Fragment } from "react";
import type { ComponentType } from "react";
import { Routes as Switch, Route } from "react-router-dom";

const PRESERVED = import.meta.glob("/src/pages/(_app|404).page.tsx", {
	eager: true,
}) as Record<string, any>;
const ROUTES = import.meta.glob("/src/pages/**/[a-z[]*.page.tsx", {
	eager: true,
}) as Record<string, any>;

const preservedRoutes: Partial<Record<string, () => JSX.Element>> = Object.keys(
	PRESERVED,
).reduce((routes, path) => {
	const route = path
		.replace(/\.page\.tsx$/g, "")
		.replace(/\/src\/pages\//g, "");
	return { ...routes, [route]: PRESERVED[path]?.default };
}, {});

type RouteType = Record<string, { default: ComponentType<any> }>;
const regularRoutes = Object.keys(ROUTES as RouteType).reduce(
	(routes, path) => {
		let route = path
			// `pages/index.page.js → /`
			// `pages/flows/index.page.js → /flows`
			.replace(/\/index\.page\.tsx$/g, "")
			// Not all pages are `index.page.tsx` e.g.
			// `pages/blog/[...catch-all].page.js → /blog/**/*`
			// `pages/flows/[id].page.js → /flows/33`
			.replace(/\.page\.tsx$/g, "")
			// We are in ./client/config
			// Pages are in ./client/pages
			// Remove `../pages`
			.replace(/\/src\/pages/g, "")
			// Wildcard
			// - Replace [...param] patterns with *
			.replace(/\[\.{3}.+\]/, "*");
		// Slug
		// - Replace [param] patterns with :param
		while (route.match(/\[(.+?)\]/)) {
			route = route.replace(/\[(.+?)\]/, ":$1");
		}

		const module = (ROUTES as RouteType)[path];
		const Component = module.default;

		return {
			...routes,
			[route]: {
				route,
				Component,
			},
		};
	},
	{},
);

const App = preservedRoutes?._app || Fragment;
const NotFound = preservedRoutes?.["404"] || Fragment;

export const Routes = (): JSX.Element => {
	return (
		<App>
			<Switch>
				<>
					{Object.values(regularRoutes).map(
						({ route, Component = Fragment }: any) => (
							<Route key={route} path={route} element={<Component />} />
						),
					)}
					<Route path="*" element={<NotFound />} />
				</>
			</Switch>
		</App>
	);
};
