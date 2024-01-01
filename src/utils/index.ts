import { format } from 'd3-format';
import { group, index } from 'd3-array';

export const createDummyData = (n: number) =>
	new Array(n).fill(0).map((_, i) => ({
		x: Math.random(),
		y: Math.random(),
		color: i % 2 === 0 ? 'alpha' : 'beta'
	}));

export const formatPercent = (x: number, figures = 0, scale = 1) =>
	format(`.${figures}%`)(x * scale);

export const groupBy = (data: any[], key: string) => {
	const getKey = (d: any) => d[key];

	const keys = data.map(getKey);

	return [...new Set(keys)].map((key) => data.filter((d) => getKey(d) === key));
};

export const pivotLonger = (
	data: any[],
	key: string,
	name: string,
	value: string,
	names_prefix?: string,
	values_fill = null
) => {
	const names = [...new Set(data.map((d) => d[name]))].map((name) =>
		names_prefix ? `${names_prefix}_${name}` : name
	);

	// Pivot the values
	const transformed = Array.from(
		group(data, (d: any) => d[key]),
		([label, group]) => {
			return Object.fromEntries(
				[[key, label]].concat(
					group.map((d) => {
						return [names_prefix ? `${names_prefix}_${d[name]}` : d[name], d[value]];
					})
				)
			);
		}
	);

	// Replace any missing values with the fill value
	return transformed.map((d) => {
		const vals: any = {};

		names.forEach((name) => {
			vals[name] = d[name] || values_fill;
		});

		return { ...d, ...vals };
	});
};

export const innerJoin = (left: any[], right: any[], by: string) => {
	const indexed = index(right, (d) => d[by]);

	return left.map((d) => ({ ...d, ...indexed.get(d[by]) }));
};
