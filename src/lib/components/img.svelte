<script lang="ts">
	import { page } from '$app/stores'
	export let src: string
	export let alt: string

	page.subscribe((p) => {
		// hack so images work
		if (!src.includes('//') && !src.startsWith('/')) {
			src = `${p.url.pathname}/${src}`
		}
	})
</script>

<img loading="lazy" {src} {alt} />
