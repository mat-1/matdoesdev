import path from 'path'
import fs from 'fs'
import { render } from 'svelte/server'

export const postsDir = 'src/routes/(blog)' as const

export async function listBlogPostSlugs(): Promise<string[]> {
	await fs.promises.readdir(postsDir)

	const existingPosts: string[] = await fs.promises.readdir(postsDir)

	// https://stackoverflow.com/a/46842181
	async function filter<T>(arr: T[], callback: (item: T) => Promise<boolean>): Promise<T[]> {
		const fail = Symbol()
		return (
			await Promise.all(arr.map(async (item) => ((await callback(item)) ? item : fail)))
		).filter((i) => i !== fail) as any
	}

	return await filter(existingPosts, (slug) =>
		fs.promises
			.stat(path.join(postsDir, slug, 'index.svx'))
			.then(() => true)
			.catch(() => false)
	)
}

export interface BlogPost {
	title: string
	subtitle: string | undefined
	published: string
	html: string
	css: string
	slug: string
}

/** Checks whether a slug is valid or not */
async function doesBlogPostExist(slug: string) {
	const existingPosts: string[] = await fs.promises.readdir(postsDir)
	if (!existingPosts.includes(slug)) return false
	return true
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

	const url = new URL(`protocol://-/${slug}`)

	const { default: post, metadata } = await import(`../routes/(blog)/${slug}/index.svx`)

	const result: {
		title: string
		subtitle: string | undefined
		head: string
		css: Set<{
			map: null
			code: string
		}>
	} = { title: '', subtitle: undefined, head: '', css: new Set() }

	const renderHtml = render(post, {
		props: result,
		context: new Map([
			[
				'__svelte__',
				{
					page: {
						// this is necessary so the page.subscribe calls in
						// img.svelte don't error for calling page.subscribe
						// outside of a component
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
		]),
	})
	// console.log('renderHtml', renderHtml)

	// HACK: i'm probably committing a felony by putting this here
	// but i couldn't come up with a better solution
	const html = /^[\w\W]*?<\/div>\s*([\w\W]+)<\/article>[\w\W]*?$/.exec(renderHtml.body)?.[1] ?? ''

	const css = Array.from(result.css)
		.map((css) => css.code)
		.join('')

	return {
		title: metadata.title,
		subtitle: metadata.subtitle || undefined,
		published: new Date(metadata.published).toISOString(),
		html,
		css,
		slug,
	}
}
