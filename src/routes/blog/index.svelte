<script lang="ts" context="module">
	export const prerender = true
	// export const router = false

	import type { Load } from '@sveltejs/kit'
	import type { BlogPostPreview } from './index.json'

	export const load: Load = async ({ fetch }) => {
		const posts = await fetch(`/blog.json`).then((r: Response) => r.json())

		return {
			props: {
				posts,
			},
		}
	}
</script>

<script lang="ts">
	import BackAnchor from '$lib/BackAnchor.svelte'
	import PostPreview from '$lib/PostPreview.svelte'

	export let posts: BlogPostPreview[] = []
</script>

<div>
	<nav>
		<BackAnchor href="/" />
	</nav>

	{#each posts as post}
		<PostPreview {post} />
	{/each}
</div>
