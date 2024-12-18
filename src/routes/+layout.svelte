<script>
	import { browser } from '$app/environment'

	let { children } = $props()

	if (browser) {
		// stake-ad.png easter egg
		if (new URLSearchParams(location.search).has('stake'))
			import('$lib/stake-ad').then((s) => s.load())
	}
</script>

{@render children?.()}
