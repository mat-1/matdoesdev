<script lang="ts">
	interface Props {
		href: string
	}

	let { href }: Props = $props()
</script>

<a {href} class="back-anchor" data-sveltekit-noscroll>
	← {#if href === '/'}Home{:else}Back{/if}
</a>

<style>
	.back-anchor {
		color: var(--text-color-alt-2);
		text-decoration: none;
	}
</style>
