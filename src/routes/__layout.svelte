<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit'

	export const load: Load = async ({ url: { pathname } }) => ({
		props: { pathname },
	})
</script>

<script lang="ts">
	import '../app.css'
	import { fly } from 'svelte/transition'
	export let pathname: string

	export const copyrightYear = new Date().getFullYear()
</script>

{#key pathname}
	<div id="page" in:fly={{ x: -5, duration: 200, delay: 200 }} out:fly={{ x: 5, duration: 200 }}>
		<main>
			<slot />
		</main>

		<footer>
			<p>&copy; {copyrightYear} matdoesdev</p>
		</footer>
	</div>
{/key}

<style>
	:global(body) {
		overflow: hidden;
	}
	#page {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: stretch;
		overflow-x: hidden;
		overflow-wrap: break-word;
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
