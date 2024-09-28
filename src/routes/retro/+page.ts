import type { Load } from '@sveltejs/kit'

export const load: Load = async ({ fetch }) => {
	const posts = await fetch('/blog-preview.json').then((r: Response) => r.json())
	const status = await fetch('/status.json').then((r: Response) => r.json())

	return {
		posts,
		status,
	}
}
