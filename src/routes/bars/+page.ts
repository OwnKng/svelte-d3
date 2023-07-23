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
					countryCodes: ['JPN', 'USA', 'GBR'],
					code: 'GC.DOD.TOTL.GD.ZS'
				})
			}).then((res) => res.json())
		}
	};
}) satisfies PageLoad;
