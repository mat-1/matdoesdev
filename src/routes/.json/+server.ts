import { json, type RequestHandler } from '@sveltejs/kit'

export const prerender = true

// this page exists so requesting the website with Accept: application/json works

export const GET: RequestHandler = async ({}) => {
	return json({
		title: 'matdoesdev',
		description: [
			"I'm mat, I do full-stack software development.",
			"This portfolio contains my blog posts and links to some of the projects I've made.",
		],
		socials: ['//github.com/mat-1"', '//matrix.to/#/@mat:matdoes.dev', '//ko-fi.com/matdoesdev'],
		links: ['/blog', '/projects'],
	})
}
