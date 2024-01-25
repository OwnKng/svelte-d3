import type { PageLoad } from './$types.js';

export const load = (async ({ fetch }) => {
	return {
		data: '',
		streamed: {
			data: fetch('/api', {
				method: 'POST',
				body: JSON.stringify({
					countryCodes: ['JPN'],
					code: 'SP.POP.GROW'
				})
			}).then((res) => res.json())
		}
	};
}) satisfies PageLoad;
