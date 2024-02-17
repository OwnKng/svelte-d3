import { getMarkdownForComponent } from '@utils/markdown';

export const load = async ({ route }) => {
	const component = route.id.split('/').slice(-1)[0];

	return {
		content: await getMarkdownForComponent(component)
	};
};
