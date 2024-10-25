<script lang="ts">
	import type { BlogPostPreview } from 'src/routes/blog.json/+server'

	interface Props {
		post: BlogPostPreview;
	}

	let { post }: Props = $props();
	// HACK: we have to do this otherwise sveltekit does a dumb
	const postHtml = `${post.html}<sty` + `le>${post.css}</style>`
</script>

<a href="/{post.slug}" class="preview-anchor">
	<article>
		<div class="article-header">
			<h2>{post.title}</h2>
			<time>{new Date(post.published).toLocaleDateString()}</time>
		</div>

		<div class="disappearing-text-preview"></div>
		<div class="preview">
			{@html postHtml}
		</div>
	</article>
</a>

<style>
	article {
		position: relative;
	}

	article > .preview {
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2; /* number of lines to show */
		line-clamp: 2;
		-webkit-box-orient: vertical;
		height: 5em;

		padding: 0;
		margin: 0;
	}

	.disappearing-text-preview {
		background: linear-gradient(
			var(--background-color-transparent) 0%,
			var(--background-color) 100%
		);
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 70%;
	}

	.preview-anchor {
		color: inherit;
		text-decoration: none;
	}

	article :global(.box) {
		display: none;
	}

	h2 {
		margin-bottom: 0;
	}
	.article-header {
		margin-bottom: 0.5em;
	}
	time {
		opacity: 0.5;
		font-style: italic;
	}
</style>
