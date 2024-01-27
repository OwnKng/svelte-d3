import { preprocessMeltUI, sequence } from '@melt-ui/pp';
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.mjs';
/** @type {import('@sveltejs/kit').Config}*/
const config = {
	extensions: ['.svelte', '.md'],
	kit: {
		adapter: adapter(),
		alias: {
			'@components': 'src/components',
			'@visualisations': 'src/visualisations',
			'@utils': 'src/utils',
			'@data': 'src/data'
		}
	},
	vitePlugin: {
		inspector: {
			toggleKeyCombo: 'meta-shift'
		}
	},
	preprocess: sequence([
		mdsvex(mdsvexConfig),
		vitePreprocess(),
		mdsvex({
			extension: '.md'
		}),
		preprocessMeltUI()
	])
};
export default config;
