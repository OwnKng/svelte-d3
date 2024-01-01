/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				background: 'var(--colors-background)',
				foreground: 'var(--colors-foreground)'
			},
			maxWidth: {
				content: '1000px'
			},
			height: {
				graph: '500px'
			}
		}
	},
	plugins: []
};
