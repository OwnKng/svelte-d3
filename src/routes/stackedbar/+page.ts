import { getWbData } from '@utils/wb';
import type { PageLoad } from './$types';

export const load = (async () => {
	const { indicator, data } = await getWbData(['CHN;IND;USA'], 'SP.POP.TOTL');

	return {
		indicator,
		series: data
	};
}) satisfies PageLoad;
