<script lang="ts">
	import { onDestroy, onMount } from 'svelte'
	import { buttonIndexFromHash, buttonUrlFromIndex, data, pageIndexFromName } from './88x31'
	import { writable } from 'svelte/store'
	import { page } from '$app/stores'
	import ButtonLink from './ButtonLink.svelte'
	import ExternalLinkIcon from './ExternalLinkIcon.svelte'
	import ExternalLink from './ExternalLink.svelte'

	let searchQuery = writable('')
	let sort = writable('relevance')

	let visibleButtons = new Set<string>()

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				visibleButtons.add(entry.target.id)
			} else {
				visibleButtons.delete(entry.target.id)
			}
		})

		visibleButtons = visibleButtons
	})

	let buttonsEl: HTMLDivElement

	// when a new button is added, observe it
	const buttonContainerObserver = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			mutation.addedNodes.forEach((node) => {
				if (node instanceof HTMLDivElement && node.classList.contains('button-container')) {
					observer.observe(node)
				}
			})
		})
	})

	let refs: HTMLDivElement[] = []
	onMount(() => {
		buttonContainerObserver.observe(buttonsEl, {
			childList: true,
		})
		// observe initial buttons
		refs.forEach((ref) => {
			observer.observe(ref)
		})
	})

	onDestroy(() => {
		refs.forEach((ref) => {
			if (ref === null) return
			observer.unobserve(ref)
		})
		buttonContainerObserver.disconnect()
	})

	let matchingTextIndexes = new Set<number>()

	let buttonEntries: [number, string][] = [...data.buttons.entries()]

	searchQuery.subscribe(updateSearch)
	sort.subscribe(updateSearch)

	function updateSearch() {
		const value = $searchQuery
		let sortValue = $sort

		if (value === '' && sortValue === 'relevance') {
			// relevance doesn't make sense if there's no query
			sortValue = 'popularity'
		}

		const newMatchingTextIndexes = new Set<number>()
		if (value !== '') {
			for (let textIndex = 0; textIndex < data.texts.length; textIndex++) {
				if (data.texts[textIndex].toLowerCase().includes(value.toLowerCase())) {
					newMatchingTextIndexes.add(textIndex)
				}
			}
		}
		matchingTextIndexes = newMatchingTextIndexes

		// filter buttonEntries
		const newButtonEntriesWithScore: [number, [number, string]][] = []

		for (let buttonIndex = 0; buttonIndex < data.button_names.length; buttonIndex++) {
			const textIndexes = data.button_names[buttonIndex]
			if (value === '' || textIndexes.some((textIndex) => matchingTextIndexes.has(textIndex))) {
				// lower score is better
				let score: number
				if (sortValue === 'relevance') {
					// shortest text index
					const textIndexLengths = textIndexes
						.map((textIndex) => data.texts[textIndex])
						.filter((text) => {
							return text.toLowerCase().includes(value.toLowerCase())
						})
						.map((text) => text.length)
					score = Math.min(...textIndexLengths)
				} else if (sortValue === 'popularity') {
					score = 1 / data.button_backlinks[buttonIndex].length
				} else if (sortValue === 'random') {
					score = Math.random()
				} else {
					throw new Error(`Unknown sort value: ${sortValue}`)
				}
				newButtonEntriesWithScore.push([score, [buttonIndex, data.buttons[buttonIndex]]])
			}
		}
		const newButtonEntries = newButtonEntriesWithScore
			.sort((a, b) => a[0] - b[0])
			.map((entry) => entry[1])
		buttonEntries = newButtonEntries
	}

	let selectedButtonHash = writable<string | null>(null)
	$: selectedButtonIndex =
		$selectedButtonHash === null ? null : buttonIndexFromHash($selectedButtonHash)
	let selectedPageName = writable<string | null>(null)
	$: selectedPageIndex = $selectedPageName === null ? null : pageIndexFromName($selectedPageName)

	page.subscribe(async (page) => {
		// this is to work around a sveltekit bug that makes it click the hash twice, which clicks the wrong link the second time
		await new Promise((r) => requestAnimationFrame(r))

		// hash
		const hash = page.url.hash.slice(1)
		// if the hash has a . then it's a page name
		if (hash === '') {
			selectedButtonHash.set(null)
			selectedPageName.set(null)
		} else if (hash.includes('.')) {
			selectedButtonHash.set(null)
			selectedPageName.set(hash)
		} else {
			selectedButtonHash.set(hash)
			selectedPageName.set(null)
		}
	})

	let cutOffButtonEntries = 1000
	let isCurrentlyAdding = false
	$: {
		buttonEntries
		cutOffButtonEntries = Math.min(buttonEntries.length, 1000)
		requestAnimationFrame(() => addMore(false))
	}
	function addMore(force: boolean) {
		if (isCurrentlyAdding && !force) return
		if (cutOffButtonEntries < buttonEntries.length) {
			isCurrentlyAdding = true
			cutOffButtonEntries = Math.min(buttonEntries.length, cutOffButtonEntries + 100)
			requestAnimationFrame(() => addMore(true))
		} else {
			isCurrentlyAdding = false
		}
	}
</script>

{#if selectedButtonIndex !== null}
	<h1>
		<img src={buttonUrlFromIndex(selectedButtonIndex)} alt="Button" class="button" />
	</h1>

	<div class="section-list">
		<section>
			<p>Links to ({data.button_links[selectedButtonIndex].length}):</p>
			<ul>
				{#each data.button_links[selectedButtonIndex] as pageIndex, i}
					<li>
						<ExternalLink {pageIndex} />
					</li>
				{/each}
			</ul>
		</section>
		<section>
			<p>Linked from ({data.button_backlinks[selectedButtonIndex].length}):</p>
			<ul>
				{#each data.button_backlinks[selectedButtonIndex] as pageIndex, i}
					<li>
						<ExternalLink {pageIndex} />
					</li>
				{/each}
			</ul>
		</section>
	</div>
{:else if selectedPageIndex !== null}
	<h1>
		{$selectedPageName}
		<a href="https://{data.pages[selectedPageIndex]}" target="_blank">
			<ExternalLinkIcon />
		</a>
	</h1>

	<p>Buttons ({data.links[selectedPageIndex].length}):</p>
	<div class="normal-button-grid">
		{#each data.links[selectedPageIndex] as linkedPageIndex, i}
			<ButtonLink
				pageIndex={linkedPageIndex}
				buttonIndex={data.link_buttons[selectedPageIndex][i]}
			/>
		{/each}
	</div>

	<p>Linked from ({data.backlinks[selectedPageIndex].length}):</p>
	<div class="normal-button-grid">
		{#each data.backlinks[selectedPageIndex] as backlinkedPageIndex, i}
			<ButtonLink
				pageIndex={backlinkedPageIndex}
				buttonIndex={data.backlink_buttons[selectedPageIndex][i]}
			/>
		{/each}
	</div>
{/if}

<div class:hidden={selectedButtonIndex !== null || selectedPageIndex !== null}>
	<input type="text" placeholder="Search" bind:value={$searchQuery} />
	<select bind:value={$sort}>
		<option value="relevance">Relevance</option>
		<option value="popularity">Popularity</option>
		<option value="random">Random</option>
	</select>

	<p><b>{buttonEntries.length.toLocaleString()}</b> buttons</p>

	<div class="compact-button-grid" bind:this={buttonsEl}>
		{#each buttonEntries.slice(0, cutOffButtonEntries) as [index, buttonHash] (buttonHash)}
			<div class="button-container" id={buttonHash} bind:this={refs[index]}>
				{#if visibleButtons.has(buttonHash)}
					<a href="/buttons#{buttonHash}">
						<img src={buttonUrlFromIndex(index)} alt="Button" class="button" />
					</a>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	.compact-button-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
	}

	.normal-button-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.button-container {
		display: inline-block;
		width: 88px;
		height: 31px;
	}

	.hidden {
		display: none;
	}

	.section-list {
		display: flex;
		gap: 1rem;
	}
</style>
