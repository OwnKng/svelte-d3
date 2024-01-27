import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.mjs';
import adapter from '@sveltejs/adapter-vercel';

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
	preprocess: [
		mdsvex(mdsvexConfig),
		vitePreprocess(),
		mdsvex({
			extension: '.md'
		})
	]
};
export default config;
