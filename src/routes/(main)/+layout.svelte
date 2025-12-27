<script lang="ts">
	import '../../app.css'
	import { fly } from 'svelte/transition'
	import type { LayoutData } from './$types'
	import { browser } from '$app/environment'
	import { writable } from 'svelte/store'
	import { onMount } from 'svelte'
	import Footer from '$lib/Footer.svelte'

	interface Props {
		data: LayoutData
		children?: import('svelte').Snippet
	}

	let { data, children }: Props = $props()

	let previousPathname = $state(data.pathname)
	let currentPathName = $state(data.pathname)
	let flyDirection = $state(1) // 1 is right, -1 is left

	let pathChangeTimestamps: number[] = []

	let stopGravity: (() => void) | null = null

	async function onPathChange() {
		if (currentPathName !== '/') return
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
			requestAnimationFrame(() => {
				$pageRendered = true
			})
		})
	}

	$effect(() => {
		if (browser) {
			if (previousPathname !== currentPathName) previousPathname = currentPathName
			currentPathName = data.pathname
			// fly right if we're going forward, left if we're going back
			if (previousPathname === '/') flyDirection = 1
			else if (previousPathname === '/blog' && currentPathName !== '/') flyDirection = 1
			else flyDirection = -1

			// gravity easter egg temporarily disabled due to index page rewrite
			// onPathChange()
		}
	})
</script>

{#key data.pathname}
	<div
		id="page"
		in:fly={{ x: -5 * flyDirection, duration: 200, delay: 200 }}
		out:fly={{ x: 5 * flyDirection, duration: 200 }}
	>
		{@render children?.()}

		<Footer></Footer>
	</div>
{/key}

<style>
	#page {
		height: 100%;
		overflow-y: auto;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: stretch;
		overflow-wrap: break-word;

		scroll-behavior: smooth;
	}
	:global(article p, .force-text-justify) {
		hyphens: auto;
		hyphenate-limit-chars: 5 2 3;
		text-align: justify;
	}
	:global(article p > code:first-child) {
		text-align: left;
		hyphens: none;
		text-justify: none;
	}
	/* `text-justify: none` looks better but is unsupported by chrome */
	@supports not (text-justify: none) {
		:global(p > code:first-child) {
			word-break: break-all;
		}
	}
	:global(body) {
		overflow-x: hidden;
	}
</style>
