import staticAdapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'
import { mdsvex } from 'mdsvex'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess(),
		mdsvex({
			extensions: ['.svx'],
			layout: './src/lib/PostLayout.svelte',
		}),
	],

	extensions: ['.svelte', '.svx'],

	kit: {
		adapter: staticAdapter({}),
		prerender: {
			entries: ['*', '/blog/minecraft-scanning/minecraft-server-background.png'],
		},
	},
}

export default config
