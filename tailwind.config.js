/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				background: 'var(--colors-background)',
				foreground: 'var(--colors-foreground)',
				midnight: 'var(--colors-midnight)',
				'midnight-75': 'var(--colors-midnight-75)',
				'midnight-50': 'var(--colors-midnight-50)',
				'midnight-25': 'var(--colors-midnight-25)',
				primary: 'var(--colors-primary)'
			},
			maxWidth: {
				content: '1024px'
			},
			height: {
				graph: '500px'
			}
		}
	},
	plugins: []
};
