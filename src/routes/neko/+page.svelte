<script lang="ts">
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

	const spritesheetUrls = nekoConfig.spritesheetUrls
	let accel = nekoConfig.accelMultiplier
	let slipperiness = nekoConfig.slipperiness * 100
	let persistOnReload = nekoConfig.persistOnReload

	$: accelStr = accel.toString()
	$: slipperinessStr = slipperiness.toString()

	function updateFromAccelStr() {
		accel = parseInt(accelStr)
	}
	function updateFromSlipperinessStr() {
		slipperiness = parseInt(slipperinessStr)
	}

	$: {
		nekoConfig.accelMultiplier = accel
		if (browser) localStorage.setItem(LOCALSTORAGE_NAMES.accelMultiplier, JSON.stringify(accel))
	}
	$: {
		nekoConfig.slipperiness = slipperiness * 0.01
		if (browser)
			localStorage.setItem(LOCALSTORAGE_NAMES.slipperiness, JSON.stringify(nekoConfig.slipperiness))
	}
	$: {
		nekoConfig.persistOnReload = persistOnReload
		if (browser)
			localStorage.setItem(LOCALSTORAGE_NAMES.persistOnReload, JSON.stringify(persistOnReload))
	}

	function addSpritesheet() {
		$spritesheetUrls = [...$spritesheetUrls, BASE_SPRITESHEET_URL]
	}
	function removeSpritesheet(i: number) {
		$spritesheetUrls = $spritesheetUrls.filter((_, j) => j !== i)
	}

	onMount(() => {
		$pageRendered = true
	})

	let windowHidden = false
	function closeWindow() {
		windowHidden = true
	}
	let windowMaximized = false
	function toggleMaximizeWindow() {
		windowMaximized = !windowMaximized
		offsetX = offsetY = initialX = initialY = 0
	}

	let startMouseX = 0
	let startMouseY = 0
	let initialX = 0
	let initialY = 0
	let offsetX = 0
	let offsetY = 0

	let mouseDown = false

	function startDragWindow(e: MouseEvent) {
		if (mouseDown || windowMaximized) return
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
	<title>cat config page</title>
	<meta
		name="description"
		content="meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow :3"
	/>
</svelte:head>

<svelte:body on:mousemove={dragWindow} on:mouseup={stopDragWindow} />

<div
	class="window"
	class:window-hidden={windowHidden}
	class:window-maximized={windowMaximized}
	style="left: {initialX + offsetX}px; top: {initialY + offsetY}px"
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="title-bar" on:mousedown={startDragWindow}>
		<div class="title-bar-text">cat config page</div>
		<div class="title-bar-controls">
			<button aria-label="Minimize" on:click={closeWindow}></button>
			<button aria-label="Maximize" on:click={toggleMaximizeWindow}></button>
			<button aria-label="Close" on:click={closeWindow}></button>
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
			<button on:click={() => initNeko()()}>summon neko</button>
			<!-- you intentionally cannot despawn nekos without disabling persistence and reloading -->
		</section>

		<section>
			<label for="neko-config-acceleration">acceleration:</label>
			<input
				class="neko-config-text-input"
				id="neko-config-acceleration"
				type="text"
				bind:value={accelStr}
				on:input={updateFromAccelStr}
			/>
			<input type="range" min="0" max="25" bind:value={accel} />
		</section>

		<section>
			<label for="neko-config-slipperiness">slipperiness:</label>
			<input
				class="neko-config-text-input"
				id="neko-config-slipperiness"
				type="text"
				bind:value={slipperinessStr}
				on:input={updateFromSlipperinessStr}
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
