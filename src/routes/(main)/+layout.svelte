<script lang="ts">
	import '../../app.css'
	import { fly } from 'svelte/transition'
	import type { LayoutData } from '../$types'

	export let data: LayoutData

	// + 1 because i live in the future
	export const copyrightYear = new Date().getFullYear() + 1

	let previousPathname = data.pathname
	let currentPathName = data.pathname
	let flyDirection = 1 // 1 is right, -1 is left
	$: {
		if (previousPathname !== currentPathName) previousPathname = currentPathName
		currentPathName = data.pathname

		// fly right if we're going forward, left if we're going back
		if (previousPathname === '/') flyDirection = 1
		else if (previousPathname === '/blog' && currentPathName !== '/') flyDirection = 1
		else flyDirection = -1
	}
</script>

{#key data.pathname}
	<div
		id="page"
		in:fly={{ x: -5 * flyDirection, duration: 200, delay: 200 }}
		out:fly={{ x: 5 * flyDirection, duration: 200 }}
	>
		<main>
			<slot />
		</main>

		<footer>
			<p>&copy; {copyrightYear} mat</p>
		</footer>
	</div>
{/key}

<style>
	/* :global(body) {
		overflow: hidden;
	} */
	#page {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: stretch;
		overflow-x: hidden;
		overflow-wrap: break-word;
		position: relative;
	}

	main {
		padding: 1em;
		margin: auto;
		flex: 1 0;
		max-width: 50em;
		width: calc(100% - 2em);
	}
	footer {
		text-align: center;
		flex: 0 0;
		color: var(--text-color-alt-3);
	}
</style>
