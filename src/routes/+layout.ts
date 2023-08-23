export const prerender = true

export const load = async function ({ url }) {
	return {
		pathname: url.pathname,
	}
}
