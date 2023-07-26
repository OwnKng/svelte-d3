import { getWbData } from '@utils/wb.js';
import { cacheHeader } from 'pretty-cache-header';

//_ A simple abstraction over the World Bank API which adds caching headers
export const POST = async ({ request, fetch }) => {
	const { countryCodes, code, date } = await request.json();

	if (!countryCodes || !code) return new Response('Missing countryCodes or code', { status: 400 });

	try {
		const data = await getWbData(fetch, countryCodes, code, date);

		return new Response(JSON.stringify(data), {
			headers: {
				'Cache-Control': cacheHeader({
					public: true,
					maxAge: '1hour',
					staleWhileRevalidate: '1week',
					sMaxage: '1month',
					staleIfError: '1day'
				}),
				'content-type': 'application/json;charset=UTF-8'
			}
		});
	} catch (err: any) {
		return new Response(err.message, { status: 500 });
	}
};
