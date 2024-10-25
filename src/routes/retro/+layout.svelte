<script lang="ts">
	import { onMount, mount } from 'svelte'
	import MusicPlayer from './MusicPlayer.svelte'
	import './app.css'

	let { children } = $props();

	onMount(() => {
		let musicPlayerEl = document.getElementById('music-player')
		if (!musicPlayerEl) {
			musicPlayerEl = document.createElement('div')
			musicPlayerEl.id = 'music-player'
			document.body.appendChild(musicPlayerEl)
		}

		// load the music player here so it persists across page changes
		mount(MusicPlayer, {
			target: musicPlayerEl,
		})
	})
</script>

<svelte:head>
	<!-- don't want this page to show up on search engines (non-search engine robots are fine though) -->
	<meta name="googlebot" content="noindex" />
	<meta name="bingbot" content="noindex" />
</svelte:head>

{@render children?.()}
