import { getPost, listBlogPostSlugs } from '$lib/blog'
import type { RequestHandler } from '@sveltejs/kit'

export interface BlogPostPreview {
	title: string
	published: string
	html: string
	css: string
	slug: string
}

export const get: RequestHandler = async () => {
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
					// TODO: cut off the html so it's not sending a bunch of unnecessary data over the network
					html: blogPost.html.replace(/<(img|iframe).+?\/?>|<\/?(img|iframe)>/g, ''),
					css: blogPost.css,
					slug: blogPost.slug,
				}
			})
		)
	).filter((p) => p)

	return {
		body: posts,
	} as any
}
