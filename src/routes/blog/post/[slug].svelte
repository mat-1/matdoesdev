<script lang="ts" context="module">
	import type { APIBlogPost } from './[slug].json'
	import type { Load } from '@sveltejs/kit'

	export const prerender = true

	export const load: Load = async ({ params, fetch }) => {
		const slug: string = params.slug ?? ''

		const resp = await fetch(`/blog/post/${slug}.json`)
		if (resp.status === 404)
			return {
				status: 404,
			}

		const body: APIBlogPost = await resp.json()

		return {
			props: {
				title: body.title,
				html: body.html,
			},
		}
	}
</script>

<script lang="ts">
	import BackAnchor from '$lib/BackAnchor.svelte'

	export let title: string
	export let html: string
</script>

<div class="article-container">
	<nav>
		<BackAnchor href="/blog" />
	</nav>
	<article>
		<h1>{title}</h1>
		{@html html}
	</article>
</div>

<style>
	article :global(img) {
		max-width: 30rem;
		max-height: 20rem;
		margin: 0 auto;
		display: block;
	}

	article :global(.markdown-float-left) {
		float: left;
	}
	article :global(.markdown-float-right) {
		float: right;
	}
	article :global(.markdown-float-left),
	:global(.markdown-float-right) {
		padding: 0.2em;
		border-radius: 0.2rem;
		margin: 0.1rem 1rem;
	}
</style>
