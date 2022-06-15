import { doesAssetExist, getPost, postsDir } from '$lib/blog'
import { markdownToHtml } from '$lib/utils'
import type { RequestHandler } from '@sveltejs/kit'
import path from 'path'
import fs from 'fs'

export interface APIBlogPost {
	title: string
	html: string
}

const extContentTypes: Record<string, string> = {
	png: 'image/png',
}

export const get: RequestHandler = async ({ params }) => {
	const { slug: postSlug, asset: assetName } = params

	if (!(await doesAssetExist(postSlug, assetName))) return { body: { error: 'Not found' } }

	const file = await fs.promises.readFile(path.join(postsDir, postSlug, assetName))

	// extract the file extension from the end of the file name
	const [ext = ''] = assetName.split('.').slice(-1)
	const contentType = ext in extContentTypes ? extContentTypes[ext] : 'text/plain'

	return {
		headers: {
			'content-type': contentType,
		},
		body: file,
	}
}
