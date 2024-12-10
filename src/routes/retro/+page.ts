import type { Load } from '@sveltejs/kit'

export const load: Load = async ({ fetch }) => {
	const posts = await fetch('/blog-preview.json').then((r: Response) => r.json())
	const status = await fetch('/status.json').then((r: Response) => r.json())

	let qotd = 'Error: Failed to fetch quote of the day'
	try {
		qotd = await fetch('/qotd').then((r: Response) => r.text())
		// remove first line since it's just "Quote of the day:"
		qotd = qotd.split('\n').slice(1).join('\n')
	} catch (e) {
		console.error(e)
	}

	return {
		posts,
		status,
		qotd,
	}
}
