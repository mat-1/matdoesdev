import { json, type RequestHandler } from '@sveltejs/kit'

export const prerender = true

// this page exists so requesting the website with Accept: application/json works

export const GET: RequestHandler = async ({}) => {
	const res = {
		title: 'mat does dev',
		description: [
			"hii, thanks for stopping by. i'm mat, and i make things on the internet.",
			'this is my personal web site on the world wide web.',
		],
		socials: ['//github.com/mat-1', '//matrix.to/#/@mat:matdoes.dev', '//ko-fi.com/matdoesdev'],
		links: ['/blog.json', '/projects.json'],
	}
	return new Response(JSON.stringify(res, null, 2), {
		headers: {
			'content-type': 'application/json',
		},
	})
}
