import { getWbData } from '@utils/wb';
import type { PageLoad } from './$types';
import { getMarkdownForComponent } from '@utils/markdown';

export const load = (async ({ fetch }) => {
	const markdown = getMarkdownForComponent('linechart');
	return {
		content: markdown,
		streamed: {
			data: getWbData(fetch, ['WLD'], 'SI.POV.DDAY')
		}
	};
}) satisfies PageLoad;
