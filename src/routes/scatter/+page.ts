import { getMarkdownForComponent } from '@utils/markdown';

export async function load() {
	const markdown = await getMarkdownForComponent('scatter');

	return {
		content: markdown
	};
}
