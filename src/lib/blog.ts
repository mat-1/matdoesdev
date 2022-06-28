import path from 'path'
import fs from 'fs'

export const postsDir = 'src/posts' as const

interface BlogPost {
	title: string
	published: string
	html: string
	slug: string
}

/** Checks whether a slug is valid or not */
async function doesBlogPostExist(slug: string) {
	const existingPosts: string[] = await fs.promises.readdir(postsDir)

	return existingPosts.includes(slug)
}

/** Checks whether an asset exists in a blog post */
export async function doesAssetExist(postSlug: string, assetName: string): Promise<boolean> {
	// return false if the blog post doesn't exist
	if (!(await doesBlogPostExist(postSlug))) return false

	const existingAssets: string[] = await fs.promises.readdir(path.join(postsDir, postSlug))

	return existingAssets.includes(assetName)
}

/** Get a blog post by the slug, returning null if it doesn't exist */
export async function getPost(slug: string): Promise<BlogPost | null> {
	if (!doesBlogPostExist(slug)) return null

	const url = new URL(`protocol://-/blog/${slug}`)

	const { default: post, metadata } = await import(`../posts/${slug}/index.svx`)

	// ok the post exists, so we can safely read the md file
	// const postMarkdown = (
	// 	await fs.promises.readFile(path.join(postsDir, slug, 'index.md'), 'utf8')
	// ).replace(/\r\n/g, '\n')

	// const [_, yamlMetadata = null, markdownContent = null] =
	// 	postMarkdown.match(/^---\n([\w\W]+?)\n---\n([\w\W]+)$/) ?? []

	// if (yamlMetadata === null) throw new Error(`Blog post "${slug}" has no metadata.`)
	// if (markdownContent === null) throw new Error(`Blog post "${slug}" has no content.`)

	// const metadata: NonNullable<any> = yaml.load(yamlMetadata)

	// // make sure the post has all the required metadata
	// const requiredFields = ['title', 'published']
	// for (const requiredField of requiredFields)
	// 	if (!(requiredField in metadata))
	// 		throw new Error(`Blog post "${slug}" is missing metadata field "${requiredField}"`)

	const result: {
		title: string
		head: string
		css: Set<{
			map: null
			code: string
		}>
	} = { title: '', head: '', css: new Set() }

	const html = post.$$render(
		result,
		{},
		{},
		{},
		new Map([
			[
				'__svelte__',
				{
					page: {
						// this is necessary so the hack with images works
						// probably a war crime :)
						subscribe: (r: any) => {
							r({ url })
						},
					},
					navigating: {
						subscribe: () => {
							return
						},
					},
				},
			],
		])
	)
	const css = Array.from(result.css)
		.map((css) => css.code)
		.join('')
	console.log(result)

	return {
		title: metadata.title,
		published: new Date(metadata.published).toString(),
		html: html + `<style>${css}</style>`,
		slug,
	}
}
