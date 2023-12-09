import { getPost } from '$lib/blog'
import { error, json, type RequestHandler } from '@sveltejs/kit'
import fs from 'fs/promises'

export const prerender = true

export const GET: RequestHandler = async ({ params }) => {
	const { slug } = params
	if (!slug) throw new Error('No slug')
	const post = await getPost(slug)
	if (post === null) throw error(404, 'Not found')

	const svxSource = await fs.readFile(`src/routes/${slug}/index.svx`, 'utf8')
	const mdSource = svxSource.split('---\n\n')[1]

	let content = `# ${post.title}\n\n`
	content += `_Published: ${new Date(post.published).toLocaleDateString('en-US')}_\n\n`

	content += mdSource

	return new Response(content, {
		headers: {
			'content-type': 'text/plain',
		},
	})
}
