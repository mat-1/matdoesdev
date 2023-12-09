import { type RequestHandler } from '@sveltejs/kit'

export const prerender = true

const content = `# matdoesdev

I'm mat, I do full-stack software development.
This portfolio contains my blog posts and links to some of the projects I've made.

## Socials

- [GitHub](//github.com/mat-1)
- [Matrix](//matrix.to/#/@mat:matdoes.dev)
- [Ko-fi](//ko-fi.com/matdoesdev)

## Links

- [Blog](/blog.md)
- [Projects](/projects.md)`

export const GET: RequestHandler = async ({}) => {
	return new Response(content, {
		headers: {
			'content-type': 'text/plain',
		},
	})
}
