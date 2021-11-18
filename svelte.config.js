import staticAdapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: staticAdapter({}),
		target: 'body',

		vite: {
			build: {
				target: 'es2020',
			},
			// if the user is on replit or gitpod, use a secure websocket
			server:
				process.env.REPL_ID || process.env.GITPOD_WORKSPACE_ID
					? {
							hmr: {
								protocol: 'wss',
								port: 443,
							},
					  }
					: undefined,
		},
	},
}

export default config
