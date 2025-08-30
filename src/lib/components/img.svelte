<script lang="ts">
	import { page } from '$app/stores'

	interface Props {
		src: string
		alt: string
	}

	let { src = $bindable(), alt }: Props = $props()

	page.subscribe(async (p) => {
		// hack so images work
		if (!src.includes('//') && !src.startsWith('/')) {
			src = `${p.url.pathname}/${src}`
		}
	})
</script>

<img loading="lazy" {src} {alt} />
