import type { PageLoad } from '../arc/$types';
import { getMarkdownForComponent } from '@utils/markdown';

export const load = (async ({ fetch }) => {
	const markdown = getMarkdownForComponent('polardumbbell');

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
					'IRQ',
					'SGP'
				],
				code: 'SP.DYN.LE00.IN',
				date: 1960
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
					'IRQ',
					'SGP'
				],
				code: 'SP.DYN.LE00.IN',
				date: 2020
			})
		}).then((res) => res.json())
	])
		.then((res) => res.reduce((acc, cur) => acc.concat(cur.series), []))
		.then((series) => {
			const order = series
				.filter((d) => d.date === '2020')
				.sort((a, b) => b.value - a.value)
				.map((d) => d.country);

			return {
				indicator: 'Life expectancy at birth, total (years)',
				series: series.slice().sort((a, b) => order.indexOf(b.country) - order.indexOf(a.country))
			};
		});

	return {
		content: markdown,
		streamed: {
			data
		}
	};
}) satisfies PageLoad;
