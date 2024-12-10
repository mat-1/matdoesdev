import { type RequestHandler } from '@sveltejs/kit'

export const prerender = true

export const GET: RequestHandler = async ({}) => {
	// similar to /status.json, this is redirected in caddy but we put it in
	// sveltekit too so it can be pre-rendered

	return await fetch('https://matdoes.dev/qotd')
}
