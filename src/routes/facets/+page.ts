import { getWbData } from '@utils/wb.js';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	return {
		streamed: {
			data: getWbData(fetch, ['JPN;USA;GBR;FRA;IND;BRA'], 'SP.URB.TOTL.IN.ZS')
		}
	};
}) satisfies PageLoad;
