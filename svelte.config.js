import preprocess from 'svelte-preprocess'
import staticAdapter from '@sveltejs/adapter-static'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: staticAdapter(),
		target: 'body',

		vite: {
			build: {
				target: 'es2020',
			},
			server: process.env.REPL_ID
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
