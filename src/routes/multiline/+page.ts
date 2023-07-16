import { getWbData } from '@utils/wb';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const { indicator, series } = await getWbData(fetch, ['GBR;CHN;USA'], 'NY.GDP.PCAP.CD');

	return {
		indicator,
		series: series
	};
}) satisfies PageLoad;
