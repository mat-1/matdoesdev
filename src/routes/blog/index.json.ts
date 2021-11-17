import { getPost } from '$lib/blog'
import { markdownToHtml } from '$lib/textutils'
import type { RequestHandler } from '@sveltejs/kit'
import fs from 'fs'

const postsDir = 'src/posts'

export interface BlogPostPreview {
	title: string
	html: string
	slug: string
}

export const get: RequestHandler = async () => {
	const existingPosts: string[] = await fs.promises.readdir(postsDir)

	const posts = (
		await Promise.all(
			existingPosts.map(async (slug): Promise<BlogPostPreview | null> => {
				const blogPost = await getPost(slug)

				// theoretically it's possible a blog post was deleted while we were reading the directory, so just ignore it if it's null
				if (blogPost === null) return null

				return {
					title: blogPost.title,
					html: markdownToHtml(blogPost.body),
					slug: blogPost.slug,
				}
			})
		)
	).filter((p) => p)

	return {
		body: posts,
	} as any
}
