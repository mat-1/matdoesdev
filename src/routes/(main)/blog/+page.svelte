<script lang="ts">
	import BackAnchor from '$lib/BackAnchor.svelte'
	import PostPreview from '$lib/PostPreview.svelte'
	import type { BlogPostPreview } from 'src/routes/blog.json/preview'

	interface Props {
		data: any
		posts?: BlogPostPreview[]
	}

	let { data, posts = data.posts }: Props = $props()
</script>

<svelte:head>
	<title>matdoesdev blog</title>
	<link rel="alternate" type="application/rss+xml" title="RSS" href="/blog.rss" />
	<link rel="alternate" type="application/atom+xml" title="Atom" href="/blog.atom" />
</svelte:head>

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
