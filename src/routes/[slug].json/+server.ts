import { getPost } from '$lib/blog'
import { error, json, type RequestHandler } from '@sveltejs/kit'

export const prerender = true

export interface APIBlogPost {
	title: string
	subtitle: string | undefined
	published: string
	html: string
}

export const GET: RequestHandler = async ({ params }) => {
	const { slug } = params
	if (!slug) throw new Error('No slug')

	const post = await getPost(slug)

	if (post === null) error(404, 'Not found')

	return json({
		title: post.title,
		subtitle: post.subtitle,
		published: post.published,
		html: post.html,
	})
}
