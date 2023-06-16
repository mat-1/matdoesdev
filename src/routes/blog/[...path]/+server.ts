import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ params }) => {
	console.log(params.path)
	let location = `/${params.path}`
	if (params.path == 'minecraft-server-warner') {
		location = '/matscan'
	}
	return new Response(null, {
		status: 302,
		headers: {
			Location: location,
		},
	})
}
