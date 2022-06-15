<script lang="ts">
	export let name: string
	export let href: string | undefined = undefined

	/** A link to where the code is hosted. */
	export let source: string | undefined = undefined

	export let archived = false

	export let rust = false
	export let svelte = false
	export let javascript = false
	export let typescript = false
	export let python = false
</script>

<div>
	{#if href}
		<a {href} class:no-link={archived}>
			<h2>{name}</h2>
		</a>
	{:else}
		<h2 class="no-link">{name}</h2>
	{/if}
	<p><slot /></p>
</div>

<style>
	h2 {
		margin-bottom: 0;
	}

	a {
		text-decoration: none;
		color: inherit;
	}
	.no-link {
		text-decoration: line-through;
	}
</style>
