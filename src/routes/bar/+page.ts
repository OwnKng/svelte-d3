import { getWbData } from '@utils/wb.js';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	return {
		streamed: {
			data: getWbData(fetch, ['JPN;USA;GBR'], 'GC.DOD.TOTL.GD.ZS')
		}
	};
}) satisfies PageLoad;
