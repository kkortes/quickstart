import * as layout from "../components/layout.js";

const components = [
	() => import("../../routes/index.js")
];

export const pages = [
	{
		// index.svelte
		pattern: /^\/$/,
		parts: [
			[components[0]]
		]
	}
];

export const ignore = [
	
];

export { layout };