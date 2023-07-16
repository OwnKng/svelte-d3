const url = 'https://api.worldbank.org/v2/country';

const getNumberOfPages = async (fetch: typeof globalThis.fetch, url: string) =>
	await fetch(url)
		.then((res) => res.json())
		.then(([{ pages }]) => pages);

export const getWbData = async (
	fetch: typeof globalThis.fetch,
	countries = ['WLD'],
	code = 'SI.POV.DDAY'
) => {
	const countryCodes = countries.length === 1 ? countries[0] : countries.join(';');

	const indicatorUrl = `${url}/${countryCodes}/indicator/${code}/?format=json&per_page=100`;

	const numberOfPages = await getNumberOfPages(fetch, indicatorUrl);

	const data = await Promise.all(
		new Array(numberOfPages).fill(0).map((_, i) =>
			fetch(`${indicatorUrl}&page=${i + 1}`)
				.then((res) => res.json())
				.then(([, data]) => data)
		)
	);

	return {
		indicator: data[0][0].indicator.value,
		series: data
			.flat()
			.map(({ country, date, value }) => ({ country: country.value, date, value }))
			.filter(({ value }) => value !== null)
			.sort((a, b) => a.date - b.date)
	};
};
