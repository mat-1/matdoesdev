import { type RequestHandler } from '@sveltejs/kit'
import { getPostsUntrimmed } from '../blog.json/preview'

export const prerender = true

export const GET: RequestHandler = async () => {
	const posts = await getPostsUntrimmed()

	let content = '# Blog\n\n'

	const longestTitleLength = Math.max(...posts.map((post) => post.title.length))

	for (const post of posts) {
		// => /minecraft-uuids 2024-02-22 - How to Make a List of Nearly Every Minecraft Player
		const published = new Date(post.published)
		const publishedDate = published.toISOString().split('T')[0]
		const padding = ' '.repeat(longestTitleLength - post.title.length)
		content += `=> ${publishedDate} ${post.title} ${padding}https://matdoes.dev/${post.slug}.txt\n`
	}

	return new Response(content, {
		headers: {
			'content-type': 'text/plain; charset=utf-8',
		},
	})
}
