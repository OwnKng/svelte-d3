import highlighter from './src/lib/codeHighlighter.mjs';

const config = {
	extensions: ['.svelte.md', '.md', '.svx'],
	highlight: {
		highlighter
	}
};

export default config;
