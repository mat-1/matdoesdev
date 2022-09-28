import type { Load } from '@sveltejs/kit'

export const prerender = true

export const load: Load = async ({ fetch, params }) => {
	const { slug } = params
	if (!slug) throw new Error('No slug')

	const page = await import(`../${slug}/index.svx`)

	return {
		page: page.default,
	}
}
