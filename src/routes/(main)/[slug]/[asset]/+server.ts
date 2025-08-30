import { doesAssetExist, postsDir } from '$lib/blog'
import type { RequestHandler } from '@sveltejs/kit'
import { error } from '@sveltejs/kit'
import path from 'path'
import fs from 'fs'

export const prerender = true

export interface APIBlogPost {
	title: string
	html: string
}

const extContentTypes: Record<string, string> = {
	png: 'image/png',
}

export const GET: RequestHandler = async ({ params }) => {
	const { slug: postSlug, asset: assetName } = params

	if (!postSlug) throw new Error('No slug')
	if (!assetName) throw new Error('No asset')

	if (!(await doesAssetExist(postSlug, assetName))) error(404, 'Not found')

	const filePath = path.join(postsDir, postSlug, assetName)

	const file = await fs.promises.readFile(filePath)

	// extract the file extension from the end of the file name
	const [ext = ''] = assetName.split('.').slice(-1)
	const contentType = ext in extContentTypes ? extContentTypes[ext] : 'text/plain'

	return new Response(file as BodyInit, {
		headers: {
			'Content-Type': contentType,
		},
	})
}
