import { getMarkdownForComponent } from '@utils/markdown';

export async function load() {
	const markdown = await getMarkdownForComponent('circle');

	return {
		content: markdown
	};
}
