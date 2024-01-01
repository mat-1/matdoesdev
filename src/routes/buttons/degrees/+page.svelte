<script lang="ts">
	import { writable } from 'svelte/store'
	import { pageIndexFromName, data } from '../88x31'
	import ButtonLink from '../ButtonLink.svelte'
	import { onMount } from 'svelte'
	import { page } from '$app/stores'

	let originPage = writable('')
	let targetPage = writable('')

	let originPageId: number | null
	let targetPageId: number | null

	let pageAndButtonIndexes: [number, number][] | null = []

	function calculatePath() {
		originPageId = pageIndexFromName($originPage)
		targetPageId = pageIndexFromName($targetPage)

		if (originPageId === null || targetPageId === null) return

		// determine the button for site 1 (since we won't find it by following links here)
		const originButtonIndexes: number[] = data.backlink_buttons[originPageId]
		const originButtonIndex = originButtonIndexes.sort(
			(a, b) =>
				originButtonIndexes.filter((v) => v === a).length -
				originButtonIndexes.filter((v) => v === b).length
		)[0]

		if (originPageId === targetPageId) {
			pageAndButtonIndexes = [[originPageId, originButtonIndex]]
			return
		}

		// breadth first search
		let nextQueue = [originPageId]
		let visited = new Set<number>()
		let found = false
		let cameFrom = new Map<number, number>()

		while (nextQueue.length > 0) {
			let queue = nextQueue
			nextQueue = []

			for (let pageId of queue) {
				if (pageId === targetPageId) {
					found = true
					break
				}

				for (let link of data.links[pageId]) {
					if (link === null) continue
					if (visited.has(link)) continue
					visited.add(link)
					nextQueue.push(link)
					cameFrom.set(link, pageId)
				}
			}

			if (found) break
		}

		console.log('found', found)

		if (!found) {
			pageAndButtonIndexes = null
			return
		}

		console.log('targetPageId', targetPageId)

		let nextItem: number = targetPageId
		let current: number = cameFrom.get(nextItem)!

		const targetBacklinkIndex = data.links[current]?.indexOf(nextItem)
		const targetButtonIndex =
			targetBacklinkIndex === undefined ? -1 : data.link_buttons[current][targetBacklinkIndex]

		// reconstruct path
		let pageAndButtonIndexesReversed: [number, number][] = [[targetPageId, targetButtonIndex]]

		while (current !== originPageId) {
			nextItem = cameFrom.get(current)!

			const backlinkIndex = data.links[nextItem]?.indexOf(current)
			const buttonIndex =
				backlinkIndex === undefined ? -1 : data.link_buttons[nextItem][backlinkIndex]

			pageAndButtonIndexesReversed.push([current, buttonIndex])

			current = nextItem
		}

		pageAndButtonIndexesReversed.push([originPageId, originButtonIndex])

		pageAndButtonIndexes = pageAndButtonIndexesReversed.reverse()

		localStorage.setItem('88x31-degrees-originPage', $originPage)
		localStorage.setItem('88x31-degrees-targetPage', $targetPage)
	}

	onMount(() => {
		return page.subscribe(async (page) => {
			const hash = decodeURIComponent(page.url.hash.slice(1))
			let [origin, target] = hash.split('→')

			if (origin === undefined) origin = ''
			if (target === undefined) target = ''

			if (origin === '') origin = localStorage.getItem('88x31-degrees-originPage') ?? ''
			if (target === '') target = localStorage.getItem('88x31-degrees-targetPage') ?? ''

			if (origin !== '' && $originPage !== origin) originPage.set(origin)
			if (target !== '' && $targetPage !== target) targetPage.set(target)
		})
	})

	originPage.subscribe(calculatePath)
	targetPage.subscribe(calculatePath)

	originPage.subscribe(updateHash)
	targetPage.subscribe(updateHash)

	function updateHash() {
		history.replaceState(null, '', `#${$originPage}→${$targetPage}`)
	}
</script>

<input
	type="text"
	bind:value={$originPage}
	placeholder="Origin page"
	class:invalid={originPageId === null}
/>
→
<input
	type="text"
	bind:value={$targetPage}
	placeholder="Target page"
	class:invalid={targetPageId === null}
/>

<div>
	{#if originPageId !== null && targetPageId !== null}
		{#if pageAndButtonIndexes === null}
			<p><b>No path :&#40;</b></p>
		{:else}
			<p>
				{#if pageAndButtonIndexes.length - 1 === 1}
					<b>1</b> degree of separation
				{:else}
					<b>{pageAndButtonIndexes.length - 1}</b> degrees of separation
				{/if}
			</p>
			{#each pageAndButtonIndexes as [pageIndex, buttonIndex], i}
				{#if i > 0}
					<span class="arrow">→</span>
				{/if}
				<ButtonLink {pageIndex} {buttonIndex} />
			{/each}
		{/if}
	{/if}
</div>

<style>
	.invalid {
		border-color: red;
	}
</style>
