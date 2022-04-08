<script lang="ts">
	import type { BlogPostPreview } from 'src/routes/blog/index.json'

	export let post: BlogPostPreview
</script>

<a href="/blog/post/{post.slug}" class="preview-anchor">
	<article>
		<h2>{post.title}</h2>
		<div class="preview">{@html post.html}</div>
	</article>
</a>

<style>
	article > .preview {
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2; /* number of lines to show */
		line-clamp: 2;
		-webkit-box-orient: vertical;
		height: 3.7em;

		padding: 0;
		margin: 0;
	}

	.preview-anchor {
		color: inherit;
		text-decoration: none;
	}
</style>
