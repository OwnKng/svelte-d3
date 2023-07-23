import { getMarkdownForComponent } from '@utils/markdown';

export async function load() {
	const markdown = await getMarkdownForComponent('tooltip');

	return {
		content: markdown
	};
}
