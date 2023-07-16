import { getWbData } from '@utils/wb';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	return {
		streamed: {
			data: getWbData(fetch, ['WLD'], 'SI.POV.DDAY')
		}
	};
}) satisfies PageLoad;
