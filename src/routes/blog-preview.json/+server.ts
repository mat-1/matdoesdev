import { json, type RequestHandler } from '@sveltejs/kit'
import { getPosts } from '../blog.json/preview'

export const prerender = true

export const GET: RequestHandler = async () => {
	const posts = await getPosts()

	return json(posts)
}
