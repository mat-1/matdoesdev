import type { Load } from '@sveltejs/kit'

export const prerender = true

export const load: Load = async ({ fetch }) => {
	const posts = await fetch('/blog-preview.json').then((r: Response) => r.json())

	return {
		posts,
	}
}
