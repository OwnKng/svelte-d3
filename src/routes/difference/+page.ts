import { innerJoin } from '@utils';
import { getWbData } from '@utils/wb';

export const load = async ({ fetch }) => {
	const jpn = await getWbData(fetch, ['JPN'], 'NY.GDP.PCAP.CD');
	const gbr = await getWbData(fetch, ['GBR'], 'NY.GDP.PCAP.CD');

	return {
		data: '',
		streamed: {
			series: innerJoin(
				gbr.series.map((d) => ({ date: d.date, 'United Kingdom': d.value })),
				jpn.series.map((d) => ({ date: d.date, Japan: d.value })),
				'date'
			)
		}
	};
};
