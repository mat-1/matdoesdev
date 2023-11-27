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
		adapter: staticAdapter({
			precompress: true,
			fallback: 'fallback.html',
		}),
		prerender: {
			entries: [
				'*',
				'/404',
				'/451',
				'/retro',
				'/minecraft-scanning/minecraft-server-background.png',
				'/retro/background.gif',
				'/retro/comicsans.ttf',
				// redirect /blog/* to /*
				'/blog/matdoes-dev-markdown',
				'/blog/minecraft-server-warner',
				'/blog/minecraft-scanning',
				'/blog/the-story-of-reportscammers',
				'/blog/uncovering-the-discord-twitch-bots',
				'/blog/what-are-domain-hacks',
				'/blog/who-is-mat',
			],
		},
		paths: {
			relative: false,
		},
	},
}

export default config
