<script lang="ts">
	import atkinsonHyperlegible from '$lib/fonts/atkinson-hyperlegible/latin.woff2'

	export let title = 'matdoesdev'
	export let description = ''
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<link rel="prefetch" href={atkinsonHyperlegible} />
	<link rel="me" href="https://f.matdoes.dev/mat" />
</svelte:head>
