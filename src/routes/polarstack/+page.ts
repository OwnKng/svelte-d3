import { getMarkdownForComponent } from '@utils/markdown';
import type { PageLoad } from './$types';

const labels = {
	'Population ages 0-14 (% of total population)': '0 - 14',
	'Population ages 15-64 (% of total population)': '15 - 64',
	'Population ages 65 and above (% of total population)': '65+'
};

export const load = (async ({ fetch }) => {
	const markdown = await getMarkdownForComponent('polarstack');

	const data = Promise.all([
		fetch('/api', {
			method: 'POST',
			body: JSON.stringify({
				countryCodes: [
					'CHN',
					'IND',
					'USA',
					'IDN',
					'PAK',
					'BRA',
					'NGA',
					'BGD',
					'RUS',
					'MEX',
					'JPN',
					'ETH',
					'PHL',
					'EGY',
					'VNM',
					'COD',
					'TUR',
					'IRN',
					'DEU',
					'THA',
					'GBR',
					'FRA',
					'ITA',
					'TZA',
					'ZAF',
					'KOR',
					'COL',
					'CAN',
					'ESP',
					'ARG',
					'POL',
					'AFG',
					'UKR',
					'UGA',
					'IRQ'
				],
				code: 'SP.POP.0014.TO.ZS',
				date: 2020
			})
		}).then((res) => res.json()),
		fetch('/api', {
			method: 'POST',
			body: JSON.stringify({
				countryCodes: [
					'CHN',
					'IND',
					'USA',
					'IDN',
					'PAK',
					'BRA',
					'NGA',
					'BGD',
					'RUS',
					'MEX',
					'JPN',
					'ETH',
					'PHL',
					'EGY',
					'VNM',
					'COD',
					'TUR',
					'IRN',
					'DEU',
					'THA',
					'GBR',
					'FRA',
					'ITA',
					'TZA',
					'ZAF',
					'KOR',
					'COL',
					'CAN',
					'ESP',
					'ARG',
					'POL',
					'AFG',
					'UKR',
					'UGA',
					'IRQ'
				],
				code: 'SP.POP.1564.TO.ZS',
				date: 2020
			})
		}).then((res) => res.json()),
		fetch('/api', {
			method: 'POST',
			body: JSON.stringify({
				countryCodes: [
					'CHN',
					'IND',
					'USA',
					'IDN',
					'PAK',
					'BRA',
					'NGA',
					'BGD',
					'RUS',
					'MEX',
					'JPN',
					'ETH',
					'PHL',
					'EGY',
					'VNM',
					'COD',
					'TUR',
					'IRN',
					'DEU',
					'THA',
					'GBR',
					'FRA',
					'ITA',
					'TZA',
					'ZAF',
					'KOR',
					'COL',
					'CAN',
					'ESP',
					'ARG',
					'POL',
					'AFG',
					'UKR',
					'UGA',
					'IRQ'
				],
				code: 'SP.POP.65UP.TO.ZS',
				date: 2020
			})
		}).then((res) => res.json())
	])
		.then((res) =>
			res.reduce(
				(acc, cur) =>
					acc.concat(cur.series.map((d) => ({ ...d, indicator: labels[cur.indicator] }))),
				[]
			)
		)
		.then((series) => {
			const order = series
				.filter((d) => d.indicator === '0 - 14')
				.sort((a, b) => b.value - a.value)
				.map((d) => d.countryCode);

			return series
				.slice()
				.sort((a, b) => order.indexOf(a.countryCode) - order.indexOf(b.countryCode));
		});

	return {
		content: markdown,
		streamed: {
			data
		}
	};
}) satisfies PageLoad;
