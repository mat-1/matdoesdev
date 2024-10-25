<script lang="ts">
	import type { PageData } from './$types'

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const { page, slug } = data

	const SvelteComponent = $derived(page);
</script>

<!-- make sveltekit crawl to the json, txt, and md api -->
<div style="display:none"><a href="{slug}.json">JSON API</a></div>
<div style="display:none"><a href="{slug}.txt">txt</a></div>
<div style="display:none"><a href="{slug}.md">md</a></div>

<SvelteComponent />
