<script lang="ts">
	import Forward from './icons/Forward.svelte'
	import Backward from './icons/Backward.svelte'
	import Pause from './icons/Pause.svelte'
	import Play from './icons/Play.svelte'
	import { browser } from '$app/environment'

	let musicPlayerEl: HTMLAudioElement | undefined = undefined

	let playing = false
	let volume = 50

	$: if (musicPlayerEl) musicPlayerEl.volume = volume / 100
	$: if (musicPlayerEl) {
		if (playing) {
			musicPlayerEl.play()
		} else {
			musicPlayerEl.pause()
		}
	}

	const SONGS = `2 Mello - Mirror Temple (Mirror Magic Mix)
C418 - Biome Party
Epic Mountain - Stellar Engine
Garoad - Every Day is Night
Garoad - Good For Health, Bad For Education
Garoad - Heart Of The City
HOME - 17
Ian Taylor - Autumn Voyage
Kupla - Noir
Kuraine - Summit (No More Running Mix)
Makeup and Vanity Set - Search the Night
Peppsen - Blueprint
Peppsen - Split
Toby Fox - A CYBER'S WORLD_
VØJ - Moonlit`.split('\n')
	function shuffleArray(array: any[]) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1))
			var temp = array[i]
			array[i] = array[j]
			array[j] = temp
		}
	}
	if (browser) shuffleArray(SONGS)

	let currentSongIndex = 0
	let currentSong: string
	$: {
		currentSong = SONGS[currentSongIndex]
	}

	let currentSong_: string | null = null
	$: if (musicPlayerEl) {
		if (currentSong_ !== currentSong) {
			const newSrc = `/retro/music/${currentSong.replace(/\?/g, '')}.mp3`
			musicPlayerEl.src = newSrc
			musicPlayerEl.load()
			currentSong_ = currentSong
		}
	}

	function nextSong() {
		currentSongIndex = (currentSongIndex + 1) % SONGS.length
	}

	function prevSong() {
		currentSongIndex = (currentSongIndex - 1 + SONGS.length) % SONGS.length
	}
</script>

<audio bind:this={musicPlayerEl} on:ended={nextSong} />

<table class="music-player" style={musicPlayerEl ? '' : 'display: none'}>
	<tr>
		<td>
			<button on:click={prevSong}>
				<Backward />
			</button>
		</td>
		<td>
			<button on:click={() => (playing = !playing)}>
				{#if playing}
					<Pause />
				{:else}
					<Play />
				{/if}
			</button>
		</td>
		<td>
			<button on:click={nextSong}>
				<Forward />
			</button>
		</td>
		<td>
			<span class="song-name-container">
				<span class="song-name">Now playing: {playing ? currentSong : 'Nothing'}</span>
			</span>
		</td>
		<td>
			<input type="range" min="0" max="100" class="volume-slider" bind:value={volume} />
		</td>
	</tr>
</table>

<style>
	.music-player {
		position: fixed;
		bottom: 0;
		right: 0;

		background: linear-gradient(0deg, #600, #800);
		border: 1px solid #000;

		width: 300px;
	}

	button {
		border: none;
		background: none;
		padding: 0;
		margin: 0;
		cursor: pointer;
		width: 2em;
		height: 2em;
		fill: #fff;
		filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5));

		/* vertically center */
		display: flex;
		align-items: center;
		justify-content: center;

		/* reset styles from default stylesheet */
		box-shadow: none;
	}

	button:hover {
		background-color: transparent;
	}

	.song-name-container {
		box-shadow: inset 2px 2px 2px 2px rgba(0, 0, 0, 0.3);
		padding: 0.3em;
		font-family: sans-serif;
		border-radius: 0.2em;

		width: 300px;
		display: block;
		overflow: auto;
	}

	.song-name {
		text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
		white-space: nowrap;
	}

	.volume-slider {
		width: 100px;
	}
</style>
