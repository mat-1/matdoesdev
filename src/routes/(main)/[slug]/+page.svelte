<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData
	const { page, slug } = data
</script>

<!-- make sveltekit crawl to the json, txt, and md api -->
<div style="display:none"><a href="{slug}.json">JSON API</a></div>
<div style="display:none"><a href="{slug}.txt">txt</a></div>
<div style="display:none"><a href="{slug}.md">md</a></div>

<svelte:component this={page} />
