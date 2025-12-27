<script lang="ts">
	import type { BlogPostPreview } from 'src/routes/blog.json/preview'

	interface Props {
		post: BlogPostPreview
	}

	let { post }: Props = $props()
	// HACK: we have to do this otherwise sveltekit does a dumb
	const postHtml = post.html + (post.css ? `<sty` + `le>${post.css}</style>` : '')
</script>

<a href="/{post.slug}" class="preview-anchor">
	<article>
		<div class="article-header">
			<h2>{post.title}</h2>
			<time>{new Date(post.published).toLocaleDateString()}</time>
		</div>

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
		-webkit-box-orient: vertical;
		height: 5em;

		padding: 0;
		margin: 0;

		mask-image: linear-gradient(#000d 0%, transparent 100%);
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
