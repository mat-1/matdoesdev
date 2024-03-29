import { error, type Load } from '@sveltejs/kit'

export const prerender = true

export const load: Load = async ({ params }) => {
	const { slug } = params
	if (!slug) throw new Error('No slug')

	let page
	try {
		page = await import(`../../(blog)/${slug}/index.svx`)
	} catch (e) {
		error(404, 'Not found');
	}

	return {
		page: page.default,
		slug,
	}
}
