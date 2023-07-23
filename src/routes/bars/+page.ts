import { getWbData } from '@utils/wb.js';
import type { PageLoad } from './$types';
import { getMarkdownForComponent } from '@utils/markdown';

export const load = (async ({ fetch }) => {
	const markdown = await getMarkdownForComponent('bars');

	return {
		content: markdown,
		streamed: {
			data: getWbData(fetch, ['JPN;USA;GBR'], 'GC.DOD.TOTL.GD.ZS')
		}
	};
}) satisfies PageLoad;
