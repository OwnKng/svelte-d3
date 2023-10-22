import { getMarkdownForComponent } from '@utils/markdown';

export async function load() {
	const markdown = await getMarkdownForComponent('voronoi');

	return {
		content: markdown
	};
}
