import { error } from '@sveltejs/kit'

export async function load() {
	try {
		const post = await import(`./post.md`)

		return {
			content: post.default,
		}
	} catch (e) {
		throw error(404, `Could not find ${params.slug}`)
	}
}
