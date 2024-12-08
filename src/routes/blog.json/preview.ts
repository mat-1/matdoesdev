import { listBlogPostSlugs, type BlogPost, getPost } from '$lib/blog'

export interface BlogPostPreview {
	title: string
	subtitle: string | undefined
	published: string
	html: string
	css: string
	slug: string
}

function cutOffAtLine(text: string, line: number) {
	let row = 0
	let column = 0

	let inHtmlTag = false

	let currentTag = ''
	const activeTags = []

	for (let i = 0; i < text.length; i++) {
		if (text[i] === '<') {
			inHtmlTag = true
			continue
		} else if (text[i] === '>') {
			inHtmlTag = false

			if (currentTag[0] === '!') {
			} else if (currentTag[0] === '/') {
				activeTags.pop()
			} else {
				const tagName = currentTag.split(' ')[0]
				activeTags.push(tagName)
			}
			currentTag = ''
			continue
		}
		if (inHtmlTag) {
			currentTag += text[i]
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
			let closingTags = ''

			activeTags.reverse()
			for (const tag of activeTags) {
				closingTags += `</${tag}>`
			}

			return text.slice(0, i) + closingTags + '...'
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
		subtitle: p.subtitle,
		// HACK: remove images, i WILL parse html with regex and you won't stop me
		html: cutOffAtLine(
			p.html
				.replace(/<(img|iframe).+?\/?>|<\/?(img|iframe)>/g, '')
				// sveltekit doesn't like it when we have a tags in a tags
				.replace(/<a(\b.*?)>(.*?)<\/a>/g, '<span class="link"$1>$2</span>'),
			6
		),
		css: p.css,
		slug: p.slug,
	}))
}
