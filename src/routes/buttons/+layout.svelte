<script lang="ts">
	import { page } from '$app/stores'
	import { writable } from 'svelte/store'
	import './app.css'

	let { children } = $props()
	let selectedPage = $derived($page.url.pathname.split('/').pop())

	let selectedButtonHash = writable<string | null>(null)
	let selectedPageName = writable<string | null>(null)

	page.subscribe(async (page) => {
		await new Promise((r) => requestAnimationFrame(r))
		const hash = page.url.hash.slice(1)
		// if the hash has a . then it's a page name
		if (hash === '') {
			selectedButtonHash.set(null)
			selectedPageName.set(null)
		} else if (hash.includes('.')) {
			selectedButtonHash.set(null)
			selectedPageName.set(hash)
		} else {
			selectedButtonHash.set(hash)
			selectedPageName.set(null)
		}
	})
</script>

<header>
	<nav>
		<!-- the # is necessary to make onhashchange work -->
		<a href="/buttons#" class:selected={selectedPage === 'buttons'}>Buttons</a>
		<!-- <a href="/buttons/sites" class:selected={selectedPage === 'sites'}>Sites</a> -->
		<a
			href="/buttons/degrees{$selectedPageName ? `#${$selectedPageName}` : ''}"
			class:selected={selectedPage === 'degrees'}>Degrees of separation</a
		>
	</nav>
	<nav class="source">
		<a href="https://github.com/mat-1/x227f">Source</a>
	</nav>
</header>

<main>
	{@render children?.()}
</main>

<style>
	nav {
		display: flex;
		gap: 0.5em;
	}

	header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.5rem;
	}

	.selected {
		font-weight: bold;
	}
</style>
