import type { RequestHandler } from '@sveltejs/kit'
import type { BlogPostPreview } from '../blog.json/+server'

export const prerender = true

export const GET: RequestHandler = async ({ fetch }) => {
	const posts = (await fetch('/blog.json').then((r) => r.json())) as BlogPostPreview[]
	function item(post: BlogPostPreview) {
		return `
<entry>
	<title>${post.title}</title>
	<link href="https://matdoes.dev/${post.slug}" />
	<id>https://matdoes.dev/${post.slug}</id>
	<published>${post.published}</published>
	<updated>${post.published}</updated>
</entry>
`
	}

	const out = `
<feed xmlns="http://www.w3.org/2005/Atom">
	<title>mat does dev</title>
	<subtitle>dev and gaming</subtitle>
	<link href="https://matdoes.dev/blog.atom" rel="self" />
	<link href="https://matdoes.dev/blog" />
	<id>urn:uuid:ff072254-29df-4c11-ab52-bb3938450451</id>
	<updated>2003-12-13T18:30:02Z</updated>
	${posts.map(item).join('')}
</feed>
		`

	return new Response(out, {
		headers: {
			'Content-Type': 'application/rss+xml',
		},
	})
}
