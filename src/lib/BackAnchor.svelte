<script lang="ts">
	export let href: string
</script>

<a {href} class="back-anchor">
	← {#if href === '/'}Home{:else}Back{/if}
</a>

<style>
	.back-anchor {
		color: var(--text-color-alt-2);
		text-decoration: none;
	}
</style>
