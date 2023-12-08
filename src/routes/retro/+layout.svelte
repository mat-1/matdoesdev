<script lang="ts">
	import { browser } from '$app/environment'
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

<body bgcolor="#000000" background="/retro/background.gif" text="#ffffff">
	<slot />
</body>
