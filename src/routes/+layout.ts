import type { Load } from '@sveltejs/kit'

export const prerender = true

export const load: Load = async ({ url: { pathname } }) => {
	return { pathname }
}
