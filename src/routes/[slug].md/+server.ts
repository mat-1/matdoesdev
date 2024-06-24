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

	const turndownService = new TurndownService({ headingStyle: 'atx' })
	const postMarkdown = turndownService.turndown(post.html).replace(/^# /g, '## ')

	let markdown = `# ${post.title}\n\n`
	if (post.subtitle) markdown += `## ${post.subtitle}\n\n`
	markdown += `_${new Date(post.published).toLocaleDateString()}_\n\n`
	markdown += postMarkdown

	return new Response(markdown, {
		headers: {
			'content-type': 'text/plain; charset=utf-8',
		},
	})
}
