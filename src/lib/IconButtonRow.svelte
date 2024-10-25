<script>
	import ButtonRow from './ButtonRow.svelte'
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<div class="icon-row">
	<ButtonRow>
		{@render children?.()}
	</ButtonRow>
</div>

<style>
	.icon-row {
		font-size: 1.25em;
	}
</style>
