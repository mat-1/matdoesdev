<script lang="ts">
	import '../../app.css'
	import { fly } from 'svelte/transition'
	import type { LayoutData } from '../$types'
	import { browser } from '$app/environment'
	import { writable } from 'svelte/store'
	import { onMount } from 'svelte'

	export let data: LayoutData

	// + 1 because i live in the future
	export let copyrightYear = new Date().getFullYear() + 1

	function clickCopyrightYear() {
		copyrightYear += 1
		localStorage.setItem('copyrightYear', String(copyrightYear))
	}

	let previousPathname = data.pathname
	let currentPathName = data.pathname
	let flyDirection = 1 // 1 is right, -1 is left
	$: if (browser) {
		if (previousPathname !== currentPathName) previousPathname = currentPathName
		currentPathName = data.pathname

		// fly right if we're going forward, left if we're going back
		if (previousPathname === '/') flyDirection = 1
		else if (previousPathname === '/blog' && currentPathName !== '/') flyDirection = 1
		else flyDirection = -1
		onPathChange()
	}

	let pathChangeTimestamps: number[] = []

	let stopGravity: (() => void) | null = null

	async function onPathChange() {
		// if we switched paths more than 10 times in the past 10 seconds, import $lib/gravity.js
		pathChangeTimestamps.push(Date.now())
		while (pathChangeTimestamps[0] < Date.now() - 10000) pathChangeTimestamps.shift()
		if (pathChangeTimestamps.length >= 10) {
			const { initGravity } = await import('$lib/gravity')
			// wait 200ms for the animation to finish
			await new Promise((resolve) => setTimeout(resolve, 200))
			// and an animation frame
			await new Promise((resolve) => requestAnimationFrame(resolve))

			const lastPathChangeTimestamp = pathChangeTimestamps[pathChangeTimestamps.length - 1]
			// only if it was over 200ms ago
			if (lastPathChangeTimestamp < Date.now() - 200) {
				if (currentPathName === '/') {
					stopGravity = initGravity()
				} else {
					stopGravity?.()
				}
			}
		}
	}

	const pageRendered = writable(false)
	if (browser) {
		const initialTheme = localStorage.getItem('theme') ?? 'dark'
		let globalTheme = writable(initialTheme)
		window.addEventListener('storage', (e) => {
			if (e.key === 'theme' && e.newValue) {
				globalTheme.set(e.newValue)
			}
		})
		let lastGlobalTheme = initialTheme
		globalTheme.subscribe((theme) => {
			document.body.classList.remove(`${lastGlobalTheme}-theme`)
			if (theme !== 'dark') {
				document.body.classList.add(`${theme}-theme`)
			}
			lastGlobalTheme = theme
		})

		// update copyright year from local storage
		const storedCopyrightYear = localStorage.getItem('copyrightYear')
		if (storedCopyrightYear) copyrightYear = Number(storedCopyrightYear)

		// neko persistence
		const persistNeko = localStorage.getItem('neko-persist')
		if (persistNeko === 'true') {
			;(async () => {
				const { pageRendered: nekoPageRendered } = await import('../neko/oneko')
				import('../neko/oneko.css')

				//  our neko script needs to know when the page is rendered, which may or may not have already happened
				nekoPageRendered.set($pageRendered)
				pageRendered.subscribe((v) => {
					nekoPageRendered.set(v)
				})
			})()
		}
		onMount(() => {
			$pageRendered = true
		})
	}
</script>

{#key data.pathname}
	<div
		id="page"
		in:fly={{ x: -5 * flyDirection, duration: 200, delay: 200 }}
		out:fly={{ x: 5 * flyDirection, duration: 200 }}
	>
		<main>
			<slot />
		</main>

		<footer>
			<p class="copyright">
				&copy; <span
					class="copyrightYear"
					on:click={clickCopyrightYear}
					on:keydown={clickCopyrightYear}
					role="button"
					tabindex="0">{copyrightYear}</span
				> mat
			</p>
		</footer>
	</div>
{/key}

<style>
	#page {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: stretch;
		overflow-x: hidden;
		overflow-wrap: break-word;
		position: relative;
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

	.copyrightYear {
		cursor: pointer;
		user-select: none;
	}
</style>
