<script lang="ts" context="module">
	import type { APIBlogPost } from './[slug].json';
	import type { Load } from '@sveltejs/kit'

	export const load: Load = async ({ page, fetch }) => {
		const slug: string = page.params.slug ?? ''

		const resp = await fetch(`/blog/post/${slug}.json`)
		if (resp.status === 404) return

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
	export let title: string
	export let html: string
</script>

<article>
	<h1>{title}</h1>
	{@html html}
</article>

<style>
	article {
		max-width: 50em;
		margin: 0 auto;
	}
</style>