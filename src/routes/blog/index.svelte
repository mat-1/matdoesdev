<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'
	import type { BlogPostPreview } from './index.json'

	export const get: Load = async ({ page, fetch }) => {
		const posts = await fetch(`/blog.json`).then((r) => r.json())

		return {
			props: {
				posts,
			},
		}
	}
</script>

<script lang="ts">
	export let posts: BlogPostPreview[]
</script>

<div>
	{#each posts as post}
		<article>
			<h2>{post.title}</h2>
			<p>{@html post.body}</p>
		</article>
	{/each}
</div>
