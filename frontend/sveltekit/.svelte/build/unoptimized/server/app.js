import * as renderer from '@sveltejs/kit/dist/renderer';
		import root from './_app/assets/generated/root.js';
		import * as setup from './_app/setup/index.js';
		import manifest from '../../manifest.js';

		const template = ({ head, body }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<link rel=\"icon\" href=\"/favicon.ico\" />\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n\t\t" + head + "\n\t</head>\n\t<body>\n\t\t" + body + "\n\t</body>\n</html>\n";

		const client = {"entry":"entry-dd689db9.js","deps":{"__entry__":{"js":["entry-dd689db9.js","start-fb61d9b7.js"],"css":[]},"index":{"js":["index-9bab3108.js","start-fb61d9b7.js","inject_styles-cd877ae9.js"],"css":["index-51c130cd.css"]}}};

		export const paths = {
static: "static"
		};

		export function render(request, { only_prerender = false } = {}) {
return renderer.render(request, {
	static_dir: paths.static,
	template,
	manifest,
	target: null,
	client,
	root,
	setup,
	load: (route) => require(`./routes/${route.name}.js`),
	dev: false,
	only_prerender
});
		}