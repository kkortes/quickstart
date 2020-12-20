module.exports = {
	layout: { name: "$default_layout", file: undefined, url: "/_app/assets/components/layout.svelte" },
	error: { name: "$default_error", file: undefined, url: "/_app/assets/components/error.svelte" },
	components: [
		{ name: "index", file: "index.svelte", url: "/_app/routes/index.svelte" }
	],
	pages: [
		{ path: "/", pattern: /^\/$/, parts: [{"component":{"name":"index","file":"index.svelte","url":"/_app/routes/index.svelte"},"params":[]}] }
	],
	endpoints: [
		
	]
};