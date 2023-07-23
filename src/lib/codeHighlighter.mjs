import { getHighlighter } from 'shiki';

function escapeHtml(code) {
	return code.replace(
		/[{}`]/g,
		(character) => ({ '{': '&lbrace;', '}': '&rbrace;', '`': '&grave;' }[character])
	);
}

async function highlighter(code, lang, meta) {
	const shikiHighlighter = await getHighlighter({
		theme: 'poimandres'
	});
	const html = shikiHighlighter.codeToHtml(code, {
		lang
	});
	return escapeHtml(html);
}

export default highlighter;
