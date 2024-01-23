import type { PageLoad } from './$types';
import { getMarkdownForComponent } from '@utils/markdown';

export const load = (async () => {
	const markdown = await getMarkdownForComponent('bars');

	return {
		content: markdown
	};
}) satisfies PageLoad;
