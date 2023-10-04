import type { PageLoad } from './$types';
import { getMarkdownForComponent } from '@utils/markdown';

export const load = (async ({ fetch }) => {
	return {
		content: await getMarkdownForComponent('stackedarea'),
		streamed: {
			data: fetch('/api', {
				method: 'POST',
				body: JSON.stringify({
					countryCodes: ['GBR', 'USA', 'CHN', 'JPN', 'IND'],
					code: 'SL.TLF.TOTL.FE.ZS'
				})
			}).then((res) => res.json())
		}
	};
}) satisfies PageLoad;
