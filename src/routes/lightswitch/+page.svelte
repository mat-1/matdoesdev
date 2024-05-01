<script lang="ts">
	import lightSwitchOnImage from './lightswitch-on.png'
	import lightSwitchOnSound from './lightswitch-on.mp3'
	import lightSwitchOffImage from './lightswitch-off.png'
	import lightSwitchOffSound from './lightswitch-off.mp3'

	import { writable } from 'svelte/store'
	import { browser } from '$app/environment'
	import { onMount } from 'svelte'

	let globalTheme = writable(browser ? localStorage.getItem('theme') ?? 'dark' : 'dark')
	let isLightSwitchOn = writable($globalTheme === 'light' || $globalTheme === 'extra-light')

	let mounted = false

	onMount(() => {
		window.addEventListener('storage', (e) => {
			if (e.key === 'theme' && e.newValue) {
				globalTheme.set(e.newValue)
			}
		})

		mounted = true

		let lastGlobalTheme = $globalTheme
		globalTheme.subscribe((theme) => {
			document.body.classList.remove(`${lastGlobalTheme}-theme`)
			// dark theme is the default so it doesn't need to be added
			if (theme !== 'dark') {
				document.body.classList.add(`${theme}-theme`)
			}
			lastGlobalTheme = theme
		})
	})

	isLightSwitchOn.subscribe((isLight) => {
		if (!mounted) return

		// play sound effect
		const audio = new Audio(isLight ? lightSwitchOnSound : lightSwitchOffSound)
		audio.play()

		// 100ms delay to be slightly more realistic
		setTimeout(() => {
			if (isLight) {
				$globalTheme = $globalTheme !== 'light' ? 'light' : 'extra-light'
			} else {
				$globalTheme = $globalTheme !== 'dark' ? 'dark' : 'extra-dark'
			}
			localStorage.setItem('theme', $globalTheme)
		}, 100)
	})
</script>

<main>
	{#if mounted}
		<button on:click={() => ($isLightSwitchOn = !$isLightSwitchOn)}>
			<img
				src={$isLightSwitchOn ? lightSwitchOnImage : lightSwitchOffImage}
				alt="Light switch on"
				class="lightswitch"
			/>
		</button>
	{/if}
</main>

<style>
	:global(html, body) {
		height: 100%;
		margin: 0;
	}

	button {
		margin: 0;
		padding: 0;
		background: transparent;
		border: none;
	}

	main {
		background-color: #000;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;

		filter: brightness(0.5);
	}

	:global(body.light-theme) main {
		background-color: #fff;
		filter: brightness(1);
	}
	:global(body.extra-light-theme) main {
		background-color: #fff;
		filter: brightness(1) opacity(0.1);
	}
	:global(body.extra-dark-theme) main {
		background-color: #000;
		filter: brightness(0.05);
	}

	.lightswitch {
		image-rendering: pixelated;
		cursor: pointer;
	}
</style>
