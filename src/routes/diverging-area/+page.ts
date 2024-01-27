import type { PageLoad } from './$types.js';
import { getMarkdownForComponent } from '@utils/markdown';

export const load = (async ({ fetch }) => {
	return {
		content: await getMarkdownForComponent('divergingarea'),
		streamed: {
			data: fetch('/api', {
				method: 'POST',
				body: JSON.stringify({
					countryCodes: ['GBR'],
					code: 'NY.GDP.MKTP.KD.ZG'
				})
			}).then((res) => res.json())
		}
	};
}) satisfies PageLoad;
