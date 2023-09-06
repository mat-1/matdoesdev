import type { RequestHandler } from '@sveltejs/kit'

export const prerender = true

export const GET: RequestHandler = async ({ params }) => {
	let location = `/${params.path}`
	if (params.path == 'minecraft-server-warner') {
		location = '/matscan'
	}
	return new Response(null, {
		status: 301,
		headers: {
			Location: location,
		},
	})
}
