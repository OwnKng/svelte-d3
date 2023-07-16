/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
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
