import { getWbData } from '@utils/wb';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const { indicator, series } = await getWbData(fetch, ['CHN;IND;USA'], 'SP.POP.TOTL');

	return {
		indicator,
		series: series
	};
}) satisfies PageLoad;
