import type { RequestHandler } from '@sveltejs/kit'
import type { BlogPostPreview } from '../blog.json/+server'

export const prerender = true

export const GET: RequestHandler = async ({ fetch }) => {
	const posts: BlogPostPreview[] = await fetch('/blog.json').then((res) => res.json())

	let content = '# Blog\n\n'

	for (const post of posts) {
		const publishedDate = new Date(post.published).toLocaleDateString('en-US')
		content += `- [${publishedDate} - ${post.title}](/${post.slug}.md)\n`
	}

	return new Response(content, {
		headers: {
			'content-type': 'text/plain',
		},
	})
}
