import type { Load } from '@sveltejs/kit'

export const load: Load = async ({ fetch }) => {
	const posts = await fetch('/blog.json').then((r: Response) => r.json())

	return {
		posts,
	}
}
