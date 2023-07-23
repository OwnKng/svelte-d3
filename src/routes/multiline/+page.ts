import type { PageLoad } from './$types';
import { getMarkdownForComponent } from '@utils/markdown';

export const load = (async ({ fetch }) => {
	const markdown = getMarkdownForComponent('multiline');

	return {
		content: markdown,
		streamed: {
			data: fetch('/api', {
				method: 'POST',
				body: JSON.stringify({
					countryCodes: ['GBR', 'CHN', 'USA'],
					code: 'NY.GDP.PCAP.CD'
				})
			}).then((res) => res.json())
		}
	};
}) satisfies PageLoad;
