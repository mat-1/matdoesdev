<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet
		alt: string
	}

	let { children, alt }: Props = $props()
</script>

<span class="icon" aria-label={alt}>
	{@render children?.()}
</span>

<style>
	.icon {
		height: 1em;
		width: 1em;
		/* opacity: 0.5; */
		transition: opacity 200ms;
		display: inline-block;
	}
	.icon :global(img) {
		display: block;
		margin: 0 auto;
	}
	/* :global(a) .icon:hover {
		opacity: 0.9;
	} */
</style>
