import type { PageLoad } from './$types';
import { getMarkdownForComponent } from '@utils/markdown';

export const load = (async ({ fetch }) => {
	const markdown = getMarkdownForComponent('linechart');
	return {
		content: markdown,
		streamed: {
			data: fetch('/api', {
				method: 'POST',
				body: JSON.stringify({
					countryCodes: ['WLD'],
					code: 'SI.POV.DDAY'
				})
			}).then((res) => res.json())
		}
	};
}) satisfies PageLoad;
