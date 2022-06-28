<script context="module">
	import img from './components/img.svelte'
	import BackAnchor from '$lib/BackAnchor.svelte'

	// mdsvex moment
	export { img as image, img }
</script>

<script>
	export let title = 'Untitled'
	export let published = ''
</script>

<div class="article-container">
	<nav>
		<BackAnchor href="/blog" />
	</nav>
	<article>
		<div class="article-header">
			<h1>{title}</h1>
			<time>{new Date(published).toLocaleDateString()}</time>
		</div>

		<slot />
	</article>
</div>

<style>
	article :global(img) {
		max-width: 30rem;
		max-height: 20rem;
		margin: 1em auto;
		display: block;
	}
	article :global(.box) {
		border: 1px solid var(--background-color-alt-3);
		padding: 0.5em;
		border-radius: 0.2em;
		width: fit-content;
		margin-bottom: 0.5em;
		box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.8);
	}
	article :global(.warning::before) {
		content: 'Warning';
		background: url(/emoji/26a0.svg) no-repeat;
		height: 1em;
		display: block;
		padding-left: 1.2em;
		margin-right: 0.2em;
		margin-bottom: 0.2em;
		font-weight: bold;
	}
	h1 {
		margin-bottom: 0;
	}
	.article-header {
		margin-bottom: 1em;
	}
	time {
		opacity: 0.5;
		font-style: italic;
	}
</style>
