import { minify } from 'html-minifier'
import { prerendering } from '$app/env'
import type { Handle } from '@sveltejs/kit'

const minification_options = {
	collapseBooleanAttributes: true,
	collapseWhitespace: true,
	conservativeCollapse: true,
	decodeEntities: true,
	html5: true,
	ignoreCustomComments: [/^#/],
	minifyCSS: true,
	minifyJS: false,
	removeAttributeQuotes: true,
	removeComments: true,
	removeOptionalTags: true,
	removeRedundantAttributes: true,
	removeScriptTypeAttributes: true,
	removeStyleLinkTypeAttributes: true,
	sortAttributes: true,
	sortClassName: true,
}

export const handle: Handle = async ({ request, resolve }) => {
	const response = await resolve(request)

	if (prerendering && response.headers['content-type'] === 'text/html') {
		response.body = minify(response.body, minification_options)
	}

	return response
}
