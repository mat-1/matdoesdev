import type { RequestHandler } from '@sveltejs/kit'
import type { BlogPostPreview } from '../blog.json/+server'

export const prerender = true

export const GET: RequestHandler = async ({ fetch }) => {
	const posts = (await fetch('/blog.json').then((r) => r.json())) as BlogPostPreview[]
	function item(post: BlogPostPreview) {
		return `
<item>
	<title>${post.title}</title>
	<link>https://matdoes.dev/blog/${post.slug}</link>
	<pubDate>${post.published}</pubDate>
</item>
`
	}

	const out = `
<rss version="2.0">
	<channel>
		<title>mat does dev</title>
		<link>https://matdoes.dev/blog</link>
		<description>dev and gaming</description>
		${posts.map(item).join('')}
	</channel>
</rss>
		`

	return new Response(out, {
		headers: {
			'Content-Type': 'application/rss+xml',
		},
	})
}
