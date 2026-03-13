<script lang="ts">
	import minionPro from '$lib/fonts/minion-pro/minion-pro-medium-latin.woff2'
	import vollkorn from '$lib/fonts/vollkorn/vollkorn-bold-latin.woff2'

	interface Props {
		title?: string
		description?: string
	}

	let { title = 'mat does dev', description = '' }: Props = $props()
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<link rel="prefetch" href={minionPro} />
	<link rel="prefetch" href={vollkorn} />
	<link rel="me" href="https://f.matdoes.dev/mat" />
</svelte:head>
