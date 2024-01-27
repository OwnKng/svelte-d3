import { groupBy } from '@utils';
import type { PageLoad } from './$types.js';
import { getMarkdownForComponent } from '@utils/markdown';

const LABELS = {
	'Imports of goods and services (% of GDP)': 'Imports',
	'Exports of goods and services (% of GDP)': 'Exports'
};

export const load = (async ({ fetch }) => {
	const data = Promise.all([
		fetch('/api', {
			method: 'POST',
			body: JSON.stringify({
				countryCodes: ['USA', 'CHN', 'JPN', 'GBR', 'DEU', 'FRA'],
				code: 'NE.IMP.GNFS.ZS'
			})
		}).then((res) => res.json()),
		fetch('/api', {
			method: 'POST',
			body: JSON.stringify({
				countryCodes: ['USA', 'CHN', 'JPN', 'GBR', 'DEU', 'FRA'],
				code: 'NE.EXP.GNFS.ZS'
			})
		}).then((res) => res.json())
	]).then((res) => {
		const combined = res.reduce(
			(acc, cur) => acc.concat(cur.series.map((d) => ({ ...d, indicator: LABELS[cur.indicator] }))),
			[]
		);

		const dataXCountry = groupBy(combined, 'countryCode');

		const cleaned = dataXCountry.map((d) => {
			const years = d.map((d) => d.date);

			return years.map((year) => {
				const yearData = d.filter((d) => d.date === year);

				const imports = yearData.find((d) => d.indicator === 'Imports').value;
				const exports = yearData.find((d) => d.indicator === 'Exports').value;

				return {
					year,
					country: yearData[0].country,
					imports,
					exports
				};
			});
		});

		return cleaned.reduce((acc, cur) => acc.concat(cur), []);
	});

	return {
		content: await getMarkdownForComponent('divergingbar'),
		streamed: {
			data
		}
	};
}) satisfies PageLoad;
