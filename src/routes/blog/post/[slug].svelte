<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'

	export const get: Load = async ({ page, fetch }) => {
		const { slug } = page.params

		const resp = await fetch(`/blog/post/${slug}.json`)
		if (resp.status === 404) return

		const body = await resp.json()

		return {
			props: {
				title: body.title,
				body: body.body,
			},
		}
	}
</script>

<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown'
	export let title: string
	export let body: string
</script>

<article>
	<h1>{title}</h1>

	<SvelteMarkdown source={body} />
</article>
