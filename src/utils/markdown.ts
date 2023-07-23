export const getMarkdownForComponent = async (component: string) => {
	try {
		const post = await import(`../_posts/${component}.md`);

		return post.default;
	} catch (e) {
		throw new Error(`Could not find ${component}`);
	}
};
