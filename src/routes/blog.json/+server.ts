import { json, type RequestHandler } from '@sveltejs/kit'
import { getPostsUntrimmed } from './preview'

export const prerender = true

export const GET: RequestHandler = async () => {
	const posts = await getPostsUntrimmed()

	return json(posts)
}
