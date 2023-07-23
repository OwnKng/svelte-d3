import highlighter from './src/lib/codeHighlighter.mjs';

const config = {
	extensions: ['.svelte.md'],
	highlight: {
		highlighter
	}
};

export default config;
