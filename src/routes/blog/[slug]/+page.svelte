<script lang="ts">
	import PostLayout from '$lib/PostLayout.svelte'

	export let data
	const { page } = data
</script>

<svelte:component this={page} />
