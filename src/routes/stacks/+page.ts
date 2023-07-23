import { getWbData } from '@utils/wb';
import type { PageLoad } from './$types';
import { getMarkdownForComponent } from '@utils/markdown';

export const load = (async ({ fetch }) => {
	const markdown = getMarkdownForComponent('stacks');

	return {
		content: markdown,
		streamed: {
			data: fetch('/api', {
				method: 'POST',
				body: JSON.stringify({
					countryCodes: ['CHN', 'IND', 'USA'],
					code: 'SP.POP.TOTL'
				})
			}).then((res) => res.json())
		}
	};
}) satisfies PageLoad;
