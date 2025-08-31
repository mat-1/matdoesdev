<script lang="ts">
	import { onDestroy, onMount } from 'svelte'
	import {
		buttonIndexFromHash,
		buttonUrlFromIndex,
		data,
		downloadData,
		pageIndexFromName,
	} from './88x31'
	import { writable } from 'svelte/store'
	import ButtonLink from './ButtonLink.svelte'
	import ExternalLinkIcon from './ExternalLinkIcon.svelte'
	import ExternalLink from './ExternalLink.svelte'
	import { browser } from '$app/environment'
	import LoadingDots from '$lib/LoadingDots.svelte'

	let searchQuery = writable('')
	let sort = writable('relevance')

	let visibleButtons = writable(new Set<string>())

	const observer = new IntersectionObserver((entries) => {
		const newVisibleButtons = new Set($visibleButtons)
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				newVisibleButtons.add(entry.target.id)
			} else {
				newVisibleButtons.delete(entry.target.id)
			}
		})

		$visibleButtons = newVisibleButtons
	})

	let buttonsEl: HTMLDivElement | undefined = $state(undefined)

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

	let refs: HTMLDivElement[] = $state([])
	let buttonEntries: [number, string][] = $state([])

	onMount(async () => {
		await downloadData()
		if (!data) throw new Error("data should've been downloaded")
		buttonEntries = [...data.buttons.entries()]

		updateSearch($searchQuery, $sort)
		updateFromHash()

		if (!buttonsEl) throw new Error('buttonsEl should be set by now')

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

	$effect(() => {
		updateSearch($searchQuery, $sort)
	})

	function popularityScore(buttonIndex: number): number {
		if (!data) return 0

		const backlinks = new Set(
			data.button_backlinks[buttonIndex].map((i) => data.pages[i].split('/')[0])
		)
		const backlinksSecondLevelDomains = new Set(
			Array.from(backlinks).map((backlink) => backlink.split('/')[0].split('.').slice(-2).join('.'))
		)
		return backlinksSecondLevelDomains.size + backlinks.size / 100
	}

	/**
	 * Popularity, but only counts sites that used the button without linking to any site.
	 * This is meant to be used for finding decorative buttons.
	 */
	function unlinkedPopularityScore(buttonIndex: number): number {
		if (!data) return 0

		const backlinks = new Set<string>()
		for (const backlinkPageIdx of data.button_backlinks[buttonIndex]) {
			const backlinkDomain = data.pages[backlinkPageIdx].split('/')[0]
			const backlinkPageButtonIdx = data.link_buttons[backlinkPageIdx].indexOf(buttonIndex)
			if (backlinkPageButtonIdx === -1) throw new Error('no backlinkPageButtonIdx')
			const linkPageIdx = data.links[backlinkPageIdx][backlinkPageButtonIdx]

			if (linkPageIdx === null || linkPageIdx === undefined) {
				backlinks.add(backlinkDomain)
			}
		}

		const backlinksSecondLevelDomains = new Set(
			Array.from(backlinks).map((backlink) => backlink.split('/')[0].split('.').slice(-2).join('.'))
		)
		return backlinksSecondLevelDomains.size + backlinks.size / 100
	}

	function updateSearch(query: string, sortValue: string) {
		if (!data || query === undefined || sortValue === undefined) return 0

		if (query === '' && sortValue === 'relevance') {
			// relevance doesn't make sense if there's no query
			sortValue = 'popularity'
		}

		const newMatchingTextIndexes = new Set<number>()
		if (query !== '') {
			for (let textIndex = 0; textIndex < data.texts.length; textIndex++) {
				if (data.texts[textIndex].toLowerCase().includes(query.toLowerCase())) {
					newMatchingTextIndexes.add(textIndex)
				}
			}
		}
		matchingTextIndexes = newMatchingTextIndexes

		// filter buttonEntries
		const newButtonEntriesWithScore: [number, [number, string]][] = []

		for (let buttonIndex = 0; buttonIndex < data.button_names.length; buttonIndex++) {
			const textIndexes = data.button_names[buttonIndex]
			if (query === '' || textIndexes.some((textIndex) => matchingTextIndexes.has(textIndex))) {
				// higher score is better
				let score: number
				if (sortValue === 'relevance') {
					// shortest text index
					const textIndexLengths = textIndexes
						.map((textIndex) => data.texts[textIndex])
						.filter((text) => {
							return text.toLowerCase().includes(query.toLowerCase())
						})
						.map((text) => text.length)
					// popularity is tiebreaker
					score = 1 / Math.min(...textIndexLengths) + popularityScore(buttonIndex) / 10000
				} else if (sortValue === 'popularity') {
					score = popularityScore(buttonIndex)
				} else if (sortValue === 'random') {
					score = Math.random()
				} else if (sortValue === 'unlinked') {
					score = unlinkedPopularityScore(buttonIndex)
				} else {
					throw new Error(`Unknown sort value: ${sortValue}`)
				}
				newButtonEntriesWithScore.push([score, [buttonIndex, data.buttons[buttonIndex]]])
			}
		}
		const newButtonEntries = newButtonEntriesWithScore
			.sort((a, b) => b[0] - a[0])
			.map((entry) => entry[1])
		buttonEntries = newButtonEntries
	}

	let selectedButtonHash = writable<string | null>(null)
	let selectedButtonIndex = $derived(
		$selectedButtonHash === null ? null : buttonIndexFromHash($selectedButtonHash)
	)
	let selectedPageName = writable<string | null>(null)
	let selectedPageIndex = $derived(
		$selectedPageName === null ? null : pageIndexFromName($selectedPageName)
	)

	function updateFromHash() {
		const hash = location.hash.slice(1)

		// if the hash has a . then it's a page name
		if (hash === '') {
			$selectedButtonHash = null
			$selectedPageName = null
		} else if (hash.includes('.')) {
			$selectedButtonHash = null
			$selectedPageName = null // force selectedPageIndex to be recalculated
			$selectedPageName = hash
		} else {
			$selectedButtonHash = null // force selectedButtonIndex to be recalculated
			$selectedButtonHash = hash
			$selectedPageName = null
		}
	}

	let cutOffButtonEntries = $state(500)
	let isCurrentlyAdding = false
	$effect(() => {
		cutOffButtonEntries = Math.min(buttonEntries.length, 500)
	})

	function shouldAddMore() {
		return scrollY + window.innerHeight > document.body.scrollHeight - 100
	}

	function addMore(force: boolean) {
		if (isCurrentlyAdding && !force) return
		if (cutOffButtonEntries < buttonEntries.length) {
			isCurrentlyAdding = true
			cutOffButtonEntries = Math.min(buttonEntries.length, cutOffButtonEntries + 500)
			requestAnimationFrame(() => {
				if (shouldAddMore()) addMore(true)
				else isCurrentlyAdding = false
			})
		} else {
			isCurrentlyAdding = false
		}
	}

	let scrollY: number = $state(0)

	$effect(() => {
		if (browser && scrollY) {
			if (shouldAddMore()) {
				addMore(false)
			}
		}
	})
</script>

<svelte:window bind:scrollY onhashchange={updateFromHash} />

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
		<option value="unlinked">Unlinked</option>
	</select>

	{#if buttonEntries.length == 0 && data.pages.length === 0}
		<div class="loading-indicator">
			<LoadingDots />
		</div>
	{:else}
		<p><b>{buttonEntries.length.toLocaleString()}</b> buttons</p>
	{/if}

	<div class="compact-button-grid" bind:this={buttonsEl}>
		{#each buttonEntries.slice(0, cutOffButtonEntries) as [index, buttonHash] (buttonHash)}
			<div class="button-container" id={buttonHash} bind:this={refs[index]}>
				{#if $visibleButtons.has(buttonHash)}
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

	.loading-indicator {
		fill: #fff;
		margin-top: 1em;
	}
</style>
