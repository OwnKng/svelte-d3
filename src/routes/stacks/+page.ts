import { getWbData } from '@utils/wb';
import type { PageLoad } from './$types';
import { getMarkdownForComponent } from '@utils/markdown';

export const load = (async ({ fetch }) => {
	const markdown = getMarkdownForComponent('stacks');
	const { indicator, series } = await getWbData(fetch, ['CHN;IND;USA'], 'SP.POP.TOTL');

	return {
		content: markdown,
		indicator,
		series: series
	};
}) satisfies PageLoad;
