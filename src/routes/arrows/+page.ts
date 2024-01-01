import type { PageLoad } from './$types';
import { getWbData } from '@utils/wb';
import { getMarkdownForComponent } from '@utils/markdown';

const COUNTRYCODES = [
	'USA',
	'CHN',
	'IND',
	'JPN',
	'GBR',
	'FRA',
	'ITA',
	'CAN',
	'NZL',
	'AUS',
	'SGP',
	'ESP',
	'KOR',
	'ZAF',
	'ZAF',
	'NLD',
	'CHE',
	'NOR',
	'SWE',
	'DNK',
	'FIN',
	'DEU',
	'PRT',
	'BEL',
	'AUT',
	'GRC',
	'AFG',
	'DZA',
	'AGO'
];

const getAndMerge = async (fetch: typeof globalThis.fetch, indicator: string, dates: string[]) =>
	await Promise.all(
		dates.map(async (date) => await getWbData(fetch, COUNTRYCODES, indicator, date))
	).then((res) =>
		res.flatMap((res) => {
			return res.series.map((series) => ({
				...series,
				indicator: res.indicator
			}));
		})
	);
export const load = (async ({ fetch }) => {
	return {
		lifeExp: await getAndMerge(fetch, 'SP.DYN.LE00.IN', ['1980', '2020']),
		gdpPerCap: await getAndMerge(fetch, 'NY.GDP.PCAP.CD', ['1980', '2020']),
		content: await getMarkdownForComponent('arrows')
	};
}) satisfies PageLoad;
