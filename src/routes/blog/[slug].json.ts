import { getPost } from '$lib/blog'
import type { RequestHandler } from '@sveltejs/kit'

export interface APIBlogPost {
	title: string
	published: string
	html: string
}

export const get: RequestHandler = async ({ params }) => {
	const { slug } = params

	const post = await getPost(slug)

	if (post === null)
		return {
			body: {
				error: 'Not found',
			},
			status: 404,
		} as any

	return {
		body: {
			title: post.title,
			published: post.published,
			html: post.html,
		} as APIBlogPost,
	}
}
