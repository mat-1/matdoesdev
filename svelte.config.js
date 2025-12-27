import staticAdapter from '@sveltejs/adapter-static'
import { sveltePreprocess } from 'svelte-preprocess'
import { mdsvex } from 'mdsvex'
import rehypeExternalLinks from 'rehype-external-links'
import { join } from 'path'
import { visit } from 'unist-util-visit'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		sveltePreprocess(),
		mdsvex({
			extensions: ['.svx'],
			// https://github.com/pngwn/MDsveX/issues/720
			layout: join(import.meta.dirname, './src/lib/PostLayout.svelte'),
			highlight: {
				alias: { 'json,nofmt': 'json' },
			},
			rehypePlugins: [
				//
				[rehypeExternalLinks, { target: false, rel: ['noopener'] }],
				rehypeInsertWordBreaks,
			],
		}),
	],

	extensions: ['.svelte', '.svx'],

	kit: {
		adapter: staticAdapter({
			// precompress is too heavy on my server :(
			// precompress: true,
			fallback: 'fallback.html',
		}),
		prerender: {
			entries: [
				'*',
				'/404',
				'/451',
				'/minecraft-scanning/minecraft-server-background.png',
				'/matscan/template.md',
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

function rehypeInsertWordBreaks() {
	/**
	 * @param {Root} tree
	 * @return {undefined}
	 */
	return function (tree) {
		visit(tree, 'element', function (node) {
			if (node.tagName === 'p' || node.tagName === 'a' || node.tagName === 'code') {
				for (const child of node.children) {
					if (child.type === 'text') {
						child.value = tryInsertWordBreaks(child.value)
					}
				}
			}
		})
	}
}

function tryInsertWordBreaks(text) {
	// insert word breaks after certain characters so the browser can wrap in more situations
	text = text.replaceAll(/(\w[\/=?\-!._])(\w)/g, (_, a, b) => a + '<wbr>' + b)

	// nudge browsers to hyphenate some other words
	const hyphenate = (_, a, b) => a + '&shy;' + b
	text = text
		.replaceAll(/(path)(finder)/gi, hyphenate)
		.replaceAll(/(street)(view)/gi, hyphenate)
		.replaceAll(/(road)(trip)/gi, hyphenate)
		.replaceAll(/(proto)(buf)/gi, hyphenate)
		.replaceAll(/(pano)(rama)/gi, hyphenate)
		.replaceAll(/(inter)(net)/gi, hyphenate)
		.replaceAll(/(hash)(map)/gi, hyphenate)
		// camelCase
		.replaceAll(/([a-z])([A-Z])/g, hyphenate)

	return text
}

export default config
