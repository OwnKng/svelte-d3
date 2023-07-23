import { getWbData } from '@utils/wb';
import type { PageLoad } from './$types';
import { getMarkdownForComponent } from '@utils/markdown';

export const load = (async ({ fetch }) => {
	const markdown = getMarkdownForComponent('multiline');

	return {
		content: markdown,
		streamed: {
			data: getWbData(fetch, ['GBR;CHN;USA'], 'NY.GDP.PCAP.CD')
		}
	};
}) satisfies PageLoad;
