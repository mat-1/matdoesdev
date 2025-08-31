<script module>
	import img from './components/img.svelte'
	import BackAnchor from '$lib/BackAnchor.svelte'

	// mdsvex moment
	export { img as image, img }
</script>

<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} [title]
	 * @property {string | undefined} [subtitle]
	 * @property {string} [published]
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { title = undefined, subtitle = undefined, published = '', children } = $props()
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

{#if title}
	<div class="article-container">
		<nav>
			<BackAnchor href="/blog" />
		</nav>
		<div class="article-header">
			<h1>{title}</h1>
			{#if subtitle}
				<p class="subtitle">{subtitle}</p>
			{/if}
			<time>{new Date(published).toLocaleDateString()}</time>
		</div>
		<article>
			{@render children?.()}
		</article>
	</div>
{:else}
	{@render children?.()}
{/if}

<style>
	article :global(img),
	article :global(video) {
		max-width: 100%;
		max-height: 20rem;
		margin: auto;
		display: block;
		width: auto;
	}
	article :global(> img) {
		margin: 1em auto;
	}
	article :global(img.small-image) {
		max-height: 10rem;
	}
	article :global(img.large-image) {
		max-height: 40rem;
	}
	article :global(.box) {
		border: 1px solid var(--background-color-alt-3);
		padding: 0.5em;
		border-radius: 0.2em;
		width: fit-content;
		margin-bottom: 0.5em;
		box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.8);
	}

	article :global(.warning::before),
	article :global(.error::before) {
		height: 1em;
		display: block;
		padding-left: 1.2em;
		margin-right: 0.2em;
		margin-bottom: 0.2em;
		font-weight: bold;
		line-height: 1;

		content: var(--title);
		background: var(--image) no-repeat;
	}
	article :global(.warning) {
		--title: 'Warning';
		--image: url(/emoji/26a0.svg);
		border: none;
		border-left: 0.2em solid var(--warning-color);
	}

	article :global(.error) {
		--title: 'Error';
		--image: url(/emoji/1f6ab.svg) no-repeat;
		border: none;
		border-left: 0.2em solid var(--error-color);
	}

	h1 {
		margin-bottom: 0;
		font-size: 1.5em;
	}
	.subtitle {
		margin: 0;
	}
	.article-header {
		margin-bottom: 1em;
	}
	time {
		opacity: 0.5;
		font-style: italic;
	}
</style>
