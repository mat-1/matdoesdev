<script lang="ts">
	import BackAnchor from '$lib/BackAnchor.svelte'
	import PostPreview from '$lib/PostPreview.svelte'
	import type { BlogPostPreview } from '../blog.json/+server'

	export let data
	export let posts: BlogPostPreview[] = data.posts
</script>

<div>
	<nav>
		<BackAnchor href="/" />
	</nav>
	<h1>Blog</h1>
	<hr />
	{#each posts as post}
		<PostPreview {post} />
	{/each}
</div>
