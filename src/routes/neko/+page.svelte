<script lang="ts">
	import './oneko.css'

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
</script>

<svelte:head>
	<title>cat config page</title>
	<meta
		name="description"
		content="meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow :3"
	/>
</svelte:head>

<h1>cat config page</h1>

<noscript>
	this page depends on js, sorry :(

	<style>
		main {
			display: none;
		}
	</style>
</noscript>

<main>
	<section>
		<button on:click={() => initNeko()()}>summon neko</button>
		<!-- you intentionally cannot despawn nekos without disabling persistence and reloading -->
	</section>

	<section>
		<label>
			<div>
				acceleration:
				<input
					class="neko-config-text-input"
					type="text"
					bind:value={accel}
					on:input={updateFromAccelStr}
				/>
			</div>
			<input type="range" min="0" max="25" bind:value={accel} />
		</label>
	</section>

	<section>
		<label>
			<!-- idea for slipperiness yoinked from goldenstack -->
			<!-- https://github.com/GoldenStack/icey-oneko -->
			<div>
				slipperiness:
				<input
					class="neko-config-text-input"
					type="text"
					bind:value={slipperiness}
					on:input={updateFromSlipperinessStr}
				/>%
			</div>
			<input type="range" min="0" max="95" bind:value={slipperiness} />
		</label>
	</section>

	<section>
		<label>
			<div>
				persist nekos on reload:
				<input type="checkbox" bind:checked={persistOnReload} />
			</div>
		</label>
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

<style>
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
</style>
