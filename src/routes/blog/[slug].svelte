<script lang="ts" context="module">
	import type { APIBlogPost } from './[slug].json'
	import type { Load } from '@sveltejs/kit'

	export const prerender = true

	export const load: Load = async ({ params, fetch }) => {
		const slug: string = params.slug ?? ''

		const resp = await fetch(`/blog/${slug}.json`)
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
		margin: 1em auto;
		display: block;
	}
	article :global(.box) {
		border: 1px solid var(--background-color-alt-3);
		padding: 0.5em;
		border-radius: 0.2em;
		width: fit-content;
		margin-bottom: 0.5em;
		box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.8);
	}
	article :global(.warning::before) {
		content: 'Warning';
		background: url(/emoji/26a0.svg) no-repeat;
		height: 1em;
		display: block;
		padding-left: 1.2em;
		margin-right: 0.2em;
		margin-bottom: 0.2em;
		font-weight: bold;
	}
</style>
