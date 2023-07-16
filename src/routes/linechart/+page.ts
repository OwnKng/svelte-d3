import { getWbData } from '@utils/wb';
import type { PageLoad } from './$types';

export const load = (async () => {
	return {
		streamed: {
			data: getWbData(['WLD'], 'SI.POV.DDAY')
		}
	};
}) satisfies PageLoad;
