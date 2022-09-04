import { getPost, listBlogPostSlugs } from '$lib/blog'
import { json, type RequestHandler } from '@sveltejs/kit'

export interface BlogPostPreview {
	title: string
	published: string
	html: string
	css: string
	slug: string
}

export async function getPosts() {
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
