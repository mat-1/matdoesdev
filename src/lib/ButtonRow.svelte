<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<div class="button-row">
	{@render children?.()}
</div>

<style>
	.button-row {
		width: fit-content;
		margin: 0.5em auto;
		display: flex;
		gap: 0.5em;
	}
</style>
