import type { PageLoad } from './$types';
import { getMarkdownForComponent } from '@utils/markdown';
import { getWbData } from '@utils/wb';

export const load = (async ({ fetch }) => {
	const markdown = await getMarkdownForComponent('linechart');

	const data = await Promise.all([
		await getWbData(fetch, ['KR'], 'SP.POP.0014.TO.ZS'),
		await getWbData(fetch, ['KR'], 'SP.POP.1564.TO.ZS'),
		await getWbData(fetch, ['KR'], 'SP.POP.65UP.TO.ZS')
	]);

	const tidied = data
		.flatMap(({ indicator, series }) => series.map((d) => ({ ...d, indicator: indicator })))
		.filter((d) => ['1960', '1980', '2000', '2020'].includes(d.date));

	return {
		content: markdown,
		data: tidied
	};
}) satisfies PageLoad;
