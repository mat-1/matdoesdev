import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/retro')) {
		return resolve(event, {
			transformPageChunk: ({ html }) =>
				html.replace(
					'<body>',
					`<body bgcolor="#000000"
background="/retro/background.gif"
text="#ffffff"
link="#ffffff"
alink="#ffffff"
vlink="#ffffff">`
				),
		})
	}

	return await resolve(event)
}

// export async function handle({ event, resolve }) {
// 	return resolve(event, {
// 		transformPage: ({ html }) =>
// 			html.replace(
// 				'%bodyfields%',
// 				`bgcolor="#000000"
// background="/retro/background.gif"
// text="#ffffff"
// link="#ffffff"
// alink="#ffffff"
// vlink="#ffffff"`
// 			),
// 	})
// }
