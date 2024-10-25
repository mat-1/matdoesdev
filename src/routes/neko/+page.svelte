<script lang="ts">
	import { run } from 'svelte/legacy'

	import './oneko.css'
	import '$lib/98/98.css'

	import {
		BASE_SPRITESHEET_URL,
		initNeko,
		LOCALSTORAGE_NAMES,
		nekoConfig,
		pageRendered,
	} from './oneko'
	import { browser } from '$app/environment'
	import { onMount } from 'svelte'
	import type { FormEventHandler } from 'svelte/elements'

	const spritesheetUrls = nekoConfig.spritesheetUrls
	let accel = $state(nekoConfig.accelMultiplier)
	let slipperiness = $state(nekoConfig.slipperiness * 100)
	let persistOnReload = $state(nekoConfig.persistOnReload)

	const updateFromAccelStr: FormEventHandler<HTMLInputElement> = (e) => {
		accel = parseInt(e.currentTarget.value)
	}
	const updateFromSlipperinessStr: FormEventHandler<HTMLInputElement> = (e) => {
		slipperiness = parseInt(e.currentTarget.value)
	}

	run(() => {
		nekoConfig.accelMultiplier = accel
		if (browser) localStorage.setItem(LOCALSTORAGE_NAMES.accelMultiplier, JSON.stringify(accel))
	})
	run(() => {
		nekoConfig.slipperiness = slipperiness * 0.01
		if (browser)
			localStorage.setItem(LOCALSTORAGE_NAMES.slipperiness, JSON.stringify(nekoConfig.slipperiness))
	})
	run(() => {
		nekoConfig.persistOnReload = persistOnReload
		if (browser)
			localStorage.setItem(LOCALSTORAGE_NAMES.persistOnReload, JSON.stringify(persistOnReload))
	})

	function addSpritesheet() {
		$spritesheetUrls = [...$spritesheetUrls, BASE_SPRITESHEET_URL]
	}
	function removeSpritesheet(i: number) {
		$spritesheetUrls = $spritesheetUrls.filter((_, j) => j !== i)
	}

	onMount(() => {
		$pageRendered = true
	})

	let windowHidden = $state(false)
	function closeWindow() {
		windowHidden = true
	}
	let windowMaximized = $state(false)
	function toggleMaximizeWindow() {
		windowMaximized = !windowMaximized
		offsetX = offsetY = initialX = initialY = 0
	}

	let startMouseX = 0
	let startMouseY = 0
	let initialX = $state(16)
	let initialY = $state(16)
	let offsetX = $state(0)
	let offsetY = $state(0)

	let mouseDown = false

	function startDragWindow(e: MouseEvent) {
		if (mouseDown || windowMaximized || e.button !== 0) return
		startMouseX = e.clientX
		startMouseY = e.clientY
		initialX += offsetX
		initialY += offsetY
		offsetX = e.clientX - startMouseX
		offsetY = e.clientY - startMouseY

		mouseDown = true
	}
	function stopDragWindow(e: MouseEvent) {
		mouseDown = false
	}
	function dragWindow(e: MouseEvent) {
		if (!mouseDown) return
		offsetX = e.clientX - startMouseX
		offsetY = e.clientY - startMouseY
	}
</script>

<svelte:head>
	<title>cat config</title>
	<meta name="description" content="meow :3" />
	<meta name="theme-color" content="#ffffff" />
</svelte:head>

<svelte:body onmousemove={dragWindow} onmouseup={stopDragWindow} />

<div
	class="window"
	class:window-hidden={windowHidden}
	class:window-maximized={windowMaximized}
	style="left: {initialX + offsetX}px; top: {initialY + offsetY}px"
>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="title-bar" onmousedown={startDragWindow}>
		<div class="title-bar-text">cat config</div>
		<div class="title-bar-controls">
			<button aria-label="Minimize" onclick={closeWindow}></button>
			<button aria-label="Maximize" onclick={toggleMaximizeWindow}></button>
			<button aria-label="Close" onclick={closeWindow}></button>
		</div>
	</div>

	<noscript>
		this page depends on js, sorry :(

		<style>
			main {
				display: none;
			}
		</style>
	</noscript>

	<main class="window-body">
		<section>
			<button onclick={() => initNeko()()}>summon neko</button>
			<!-- you intentionally cannot despawn nekos without disabling persistence and reloading -->
		</section>

		<section>
			<label for="neko-config-acceleration">acceleration:</label>
			<input
				class="neko-config-text-input"
				id="neko-config-acceleration"
				type="text"
				value={accel}
				oninput={updateFromAccelStr}
			/>
			<input type="range" min="0" max="25" bind:value={accel} />
		</section>

		<section>
			<label for="neko-config-slipperiness">slipperiness:</label>
			<input
				class="neko-config-text-input"
				id="neko-config-slipperiness"
				type="text"
				value={slipperiness}
				oninput={updateFromSlipperinessStr}
			/>%
			<input type="range" min="0" max="95" bind:value={slipperiness} />
		</section>

		<section>
			<input type="checkbox" bind:checked={persistOnReload} id="neko-config-persist-on-reload" />
			<label for="neko-config-persist-on-reload"> persist nekos on reload</label>
		</section>

		<section>
			<details>
				<summary>credits</summary>
				<ul>
					<li>
						neko by <a href="https://en.wikipedia.org/wiki/Neko_(software)">various developers</a>
					</li>
					<li>original oneko.js by <a href="https://github.com/adryd325/oneko.js">adryd</a></li>
					<li>
						slipperiness by <a href="https://github.com/GoldenStack/icey-oneko">goldenstack</a>
					</li>
					<li>
						98.css by <a href="https://jdan.github.io/98.css/">jdan</a>
					</li>
				</ul>
			</details>
		</section>

		<!--
	unfinished for now because a lot of the existing spritesheets change the
	sprite coordinates and animations as well so that'd also need to be
	configurable and i haven't decided how to make that work
	-->
		<!-- <section>
		<div>spritesheets:</div>
		<div class="neko-spritesheets">
			{#each $spritesheetUrls as spritesheetUrl, i}
				<div class="neko-spritesheet-container">
					<div class="neko-spritesheet-btns">
						<button class="neko-spritesheet-remove-btn" on:click={() => removeSpritesheet(i)}
							>Remove</button
						>
						{#if i === $spritesheetUrls.length - 1}
							<button class="neko-spritesheet-add-btn" on:click={addSpritesheet}>Add</button>
						{/if}
					</div>
					<label>
						<img src={spritesheetUrl} alt="oneko spritesheet" class="neko-spritesheet" />
						<input type="file" accept="image/*" />
					</label>
				</div>
			{/each}
		</div>
	</section> -->
	</main>
</div>

<style>
	:global(html) {
		height: 100%;
	}
	:global(body) {
		background-image: url('/bliss-hd.jpg');
		background-attachment: fixed;
		background-size: cover;
		height: 100%;
		margin: 0;
	}

	:global(.music-player) {
		border-collapse: unset;
	}
	:global(.music-player .song-name) {
		color: #fff;
	}
	:global(.music-player td button) {
		min-width: fit-content;
	}

	section {
		margin-bottom: 1em;
		display: block;
		max-width: fit-content;
	}

	.neko-config-text-input {
		width: 2em;
	}

	/* .neko-spritesheets {
		display: flex;
		flex-wrap: wrap;
		gap: 1em;
	}
	.neko-spritesheet {
		image-rendering: pixelated;
		display: block;
	}
	.neko-spritesheet-btns {
		display: block;
	}
	.neko-spritesheet-add-btn {
		float: right;
	} */

	ul {
		margin: 0;
	}

	.window {
		width: fit-content;
		position: relative;
		user-select: none;
	}
	.window-hidden {
		display: none;
	}
	.window-maximized {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		width: 100%;
	}
</style>
