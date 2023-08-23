import { format } from 'd3-format';

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
