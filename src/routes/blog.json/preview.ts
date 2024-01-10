import { listBlogPostSlugs, type BlogPost, getPost } from '$lib/blog'

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
			continue
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

export async function getPostsUntrimmed(): Promise<BlogPost[]> {
	const existingPosts: string[] = await listBlogPostSlugs()

	const posts = (
		await Promise.all(
			existingPosts.map(async (slug): Promise<BlogPost | null> => {
				return await getPost(slug)
			})
		)
	)
		.filter((p) => p)
		.sort((a, b) => (new Date(a!.published) > new Date(b!.published) ? -1 : 1))

	// typescript thinks posts is (BlogPost | null)[] but it's not because of the .filter
	return posts as BlogPost[]
}

export async function getPosts() {
	const posts = await getPostsUntrimmed()
	return posts.map((p) => ({
		title: p.title,
		published: p.published,
		// HACK: remove images, i WILL parse html with regex and you won't stop me
		html: cutOffAtLine(p.html.replace(/<(img|iframe).+?\/?>|<\/?(img|iframe)>/g, ''), 6),
		css: p.css,
		slug: p.slug,
	}))
}
