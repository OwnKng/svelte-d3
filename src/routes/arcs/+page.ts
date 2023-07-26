import type { PageLoad } from './$types';
import { getMarkdownForComponent } from '@utils/markdown';

export const load = (async ({ fetch }) => {
	const markdown = await getMarkdownForComponent('bars');

	return {
		content: markdown,
		streamed: {
			data: fetch('/api', {
				method: 'POST',
				body: JSON.stringify({
					countryCodes: ['JPN', 'IND', 'CHN', 'USA', 'GBR'],
					code: 'SP.RUR.TOTL.ZS',
					date: '2020'
				})
			}).then((res) => res.json())
		}
	};
}) satisfies PageLoad;
