import { getWbData } from '@utils/wb';
import type { PageLoad } from './$types';

export const load = (async () => {
	const { indicator, data } = await getWbData(['GBR;CHN;USA'], 'NY.GDP.PCAP.CD');

	return {
		indicator,
		series: data
	};
}) satisfies PageLoad;
