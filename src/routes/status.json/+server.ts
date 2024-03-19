import { type RequestHandler } from '@sveltejs/kit'

export const prerender = true

export const GET: RequestHandler = async ({}) => {
	// status.json is hardcoded in the caddy config to redirect somewhere else.
	// we have it in svelte too so we can use it for prerendering.

	return await fetch('https://matdoes.dev/status.json')
}
