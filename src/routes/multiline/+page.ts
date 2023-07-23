import { getWbData } from '@utils/wb';
import type { PageLoad } from './$types';
import { getMarkdownForComponent } from '@utils/markdown';

export const load = (async ({ fetch }) => {
	const markdown = getMarkdownForComponent('multiline');
	const { indicator, series } = await getWbData(fetch, ['GBR;CHN;USA'], 'NY.GDP.PCAP.CD');

	return {
		content: markdown,
		indicator,
		series: series
	};
}) satisfies PageLoad;
