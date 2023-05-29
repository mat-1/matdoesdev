import { getPost, listBlogPostSlugs } from '$lib/blog'
import { json, type RequestHandler } from '@sveltejs/kit'

export const prerender = true

export interface BlogPostPreview {
	title: string
	published: string
	html: string
	css: string
	slug: string
}

function cutOffAtLine(text: string, line: number) {
	let row = 0
	let column = 0

	let inHtmlTag = false

	for (let i = 0; i < text.length; i++) {
		if (text[i] === '<') {
			inHtmlTag = true
		} else if (text[i] === '>') {
			inHtmlTag = false
		}
		if (text[i] === '\n') {
			row++
			column = 0
		} else {
			column++
		}
		if (column > 128 && !inHtmlTag) {
			row++
			column = 0
		}
		if (row >= line && !inHtmlTag) {
			return text.slice(0, i) + '...'
		}
	}
	return text
}

async function getPosts() {
	const existingPosts: string[] = await listBlogPostSlugs()

	const posts = (
		await Promise.all(
			existingPosts.map(async (slug): Promise<BlogPostPreview | null> => {
				const blogPost = await getPost(slug)

				// theoretically it's possible a blog post was deleted while we were reading the directory, so just ignore it if it's null
				if (blogPost === null) return null

				return {
					title: blogPost.title,
					published: blogPost.published,
					// HACK: remove images, i WILL parse html with regex and you won't stop me
					html: cutOffAtLine(
						blogPost.html.replace(/<(img|iframe).+?\/?>|<\/?(img|iframe)>/g, ''),
						6
					),
					css: blogPost.css,
					slug: blogPost.slug,
				}
			})
		)
	)
		.filter((p) => p)
		.sort((a, b) => (new Date(a!.published) > new Date(b!.published) ? -1 : 1))

	// typescript thinks posts is (BlogPostPreview | null)[] but it's not because of the .filter
	return posts as BlogPostPreview[]
}

export const GET: RequestHandler = async () => {
	const posts = await getPosts()

	return json(posts)
}
