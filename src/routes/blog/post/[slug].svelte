<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'

	export const get: Load = async ({ page }) => {
		// the `slug` parameter is available because this file
		// is called [slug].json.js
		const { slug } = page.params

		return {
			props: { slug },
		}
	}
</script>

<script lang="ts">
	export let slug: string

	import type { SvelteComponent } from 'svelte'
	import Post from '$lib/posts/' + slug
</script>
