import { getPost } from '$lib/blog'
import { error, json, type RequestHandler } from '@sveltejs/kit'
import TurndownService from 'turndown'

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

	let postHtml = `<h1>${post.title}</h1>\n\n`
	if (post.subtitle) postHtml += `<h2>${post.subtitle}</h2>\n\n`
	postHtml += `<p>${post.published}</p>\n\n`
	postHtml += post.html

	const turndownService = new TurndownService()
	const markdown = turndownService.turndown(postHtml)

	return new Response(markdown, {
		headers: {
			'content-type': 'text/plain; charset=utf-8',
		},
	})
}
