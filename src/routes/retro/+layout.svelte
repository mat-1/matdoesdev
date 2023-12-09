<script lang="ts">
	import { onMount } from 'svelte'
	import MusicPlayer from './MusicPlayer.svelte'
	import './app.css'

	onMount(() => {
		let musicPlayerEl = document.getElementById('music-player')
		if (!musicPlayerEl) {
			musicPlayerEl = document.createElement('div')
			musicPlayerEl.id = 'music-player'
			document.body.appendChild(musicPlayerEl)
		}

		new MusicPlayer({
			target: musicPlayerEl,
			$$inline: true,
		})
	})
</script>

<slot />
