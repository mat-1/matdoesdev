<script lang="ts" context="module">
	import type { APIBlogPost } from './[slug].json'
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

<div class="article-container">
	<a href="/blog" class="back-anchor">← Back</a>
	<article>
		<h1>{title}</h1>
		{@html html}
	</article>
</div>

<style>
	.article-container {
		max-width: 50em;
		margin: 0 auto;
	}

	.back-anchor {
		color: inherit;
		text-decoration: none;
	}
</style>
