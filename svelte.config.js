import staticAdapter from '@sveltejs/adapter-static'
import { sveltePreprocess } from 'svelte-preprocess'
import { mdsvex } from 'mdsvex'
import rehypeExternalLinks from 'rehype-external-links'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		sveltePreprocess(),
		mdsvex({
			extensions: ['.svx'],
			layout: './src/lib/PostLayout.svelte',
			highlight: {
				alias: { 'json,nofmt': 'json' },
			},
			rehypePlugins: [
				//
				[rehypeExternalLinks, { target: false, rel: ['noopener'] }],
			],
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
				'/minecraft-scanning/minecraft-server-background.png',
				// redirect /blog/* to /*
				'/blog/matdoes-dev-markdown',
				'/blog/minecraft-server-warner',
				'/blog/minecraft-scanning',
				'/blog/the-story-of-reportscammers',
				'/blog/uncovering-the-discord-twitch-bots',
				'/blog/what-are-domain-hacks',
				'/blog/who-is-mat',
				// sometimes /retro doesn't get prerendered if this isn't included
				'/retro',
				'/wp-admin.php',
				'/admin',
			],
			handleHttpError: 'warn',
		},
		paths: {
			relative: false,
		},
	},
}

export default config
