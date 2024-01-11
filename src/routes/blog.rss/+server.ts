import type { RequestHandler } from '@sveltejs/kit'
import { getPostsUntrimmed } from '../blog.json/preview'
import type { BlogPost } from '$lib/blog'

export const prerender = true

export const GET: RequestHandler = async ({ fetch }) => {
	const posts = await getPostsUntrimmed()
	function item(post: BlogPost) {
		const escapedPostHtml = post.html
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
		return `
<item>
	<title>${post.title}</title>
	<link>https://matdoes.dev/${post.slug}</link>
	<pubDate>${post.published}</pubDate>
	<description>
${escapedPostHtml}
&lt;style&gt;
${post.css}
&lt;/style&gt;
</description>
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
