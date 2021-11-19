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
	export let posts: BlogPostPreview[] = []
</script>

<div>
	{#each posts as post}
		<a href="/blog/post/{post.slug}" class="preview-anchor">
			<article>
				<h2>{post.title}</h2>
				<div class="preview">{@html post.html}</div>
			</article>
		</a>
	{/each}
</div>

<style>
	article > .preview {
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2; /* number of lines to show */
		line-clamp: 2;
		-webkit-box-orient: vertical;
		height: 3.8em;

		padding: 0;
		margin: 0;
	}

	.preview-anchor {
		color: inherit;
		text-decoration: none;
	}
</style>
