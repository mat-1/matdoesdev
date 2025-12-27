<script lang="ts">
	import atkinsonHyperlegible from '$lib/fonts/atkinson-hyperlegible/latin.woff2'

	interface Props {
		title?: string
		description?: string
	}

	let { title = 'mat does dev', description = '' }: Props = $props()
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<link rel="prefetch" href={atkinsonHyperlegible} />
	<link rel="me" href="https://f.matdoes.dev/mat" />
</svelte:head>
