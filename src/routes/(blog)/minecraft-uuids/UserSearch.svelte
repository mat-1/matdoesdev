<script lang="ts">
	import LoadingDots from '$lib/LoadingDots.svelte'
	import { writable } from 'svelte/store'

	let query = writable('')
	let searchResults = writable<string[]>([])

	const cachedTrios = new Map<string, string[]>()
	let cachedSample: string[] | null = null
	let cachedStats: Map<string, number> | null = null

	async function fetchTrio(trio: string): Promise<string[]> {
		const res = await fetch(`https://matdoes.dev/minecraft-uuids/api/${trio}.txt`)
		const text = await res.text()
		return text.split('\n')
	}

	async function fetchSample(): Promise<string[]> {
		const res = await fetch('https://matdoes.dev/minecraft-uuids/api/sample.txt')
		const text = await res.text()
		return text.split('\n')
	}

	async function fetchStats(): Promise<Map<string, number>> {
		const res = await fetch('https://matdoes.dev/minecraft-uuids/api/trios.txt')
		const text = await res.text()

		const stats = new Map<string, number>()
		text.split('\n').forEach((line) => {
			const [trio, count] = line.split(' ')
			stats.set(trio, parseInt(count))
		})

		return stats
	}

	async function getSample() {
		if (cachedSample === null) {
			const sample = await fetchSample()
			cachedSample = sample
		}

		return cachedSample
	}

	async function getStats() {
		if (cachedStats === null) {
			const stats = await fetchStats()
			cachedStats = stats
		}

		return cachedStats
	}

	function splitIntoTrios(query: string): string[] {
		const trios: string[] = []
		for (let i = 0; i < query.length - 2; i++) {
			trios.push(query.slice(i, i + 3))
		}
		return trios
	}

	function filter(results: string[], query: string): string[] {
		return results.filter((result) => result.toLowerCase().includes(query))
	}

	async function search(query: string): Promise<string[]> {
		if (query === '') {
			return []
		}

		query = query.toLowerCase().trim()

		if (query.length < 3) {
			const sample = await getSample()
			return filter(sample, query)
		} else if (query.length === 3) {
			if (cachedTrios.has(query)) {
				return cachedTrios.get(query)!
			} else {
				const trio = await fetchTrio(query)
				cachedTrios.set(query, trio)
				return trio
			}
		} else {
			const trios = splitIntoTrios(query)
			for (const trio of trios) {
				if (cachedTrios.has(trio)) {
					return filter(cachedTrios.get(trio)!, query)
				}
			}
			// nothing is cached, determine the trio in our query with the least amount of results and fetch that
			const stats = await getStats()
			const trio = trios.reduce((a, b) => (stats.get(a)! < stats.get(b)! ? a : b))
			const results = await fetchTrio(trio)
			cachedTrios.set(trio, results)
			return filter(results, query)
		}
	}

	let currentSearch: Promise<void> | null = $state(null)
	query.subscribe(async (value) => {
		if (value === '') {
			searchResults.set([])
			return
		}
		const trimmed = value.trim()
		if (trimmed !== value) {
			query.set(trimmed)
			return
		}

		// this is to make sure we don't do multiple searches at the same time
		if (currentSearch) await currentSearch

		// query changed, we don't care anymore
		if (value !== $query) return

		let resolve: (value: void) => void
		currentSearch = new Promise((r) => {
			resolve = r
		})
		try {
			const results = await search(value)
			searchResults.set(results)
		} finally {
			resolve!()
			currentSearch = null
		}
	})
</script>

<noscript>
	<div class="user-search-noscript">This doesn't work without JavaScript, sorry...</div>
	<style>
		.user-search {
			display: none;
		}
	</style>
</noscript>

<div class="user-search">
	<input type="text" bind:value={$query} placeholder="Search..." />
	<div>
		{#if $query === ''}
			<!--  -->
		{:else if currentSearch !== null}
			<LoadingDots />
		{:else}
			{#if $query.length >= 3}
				<div class="user-search-stats">
					{#if $searchResults.length === 1}
						1 result
					{:else}
						{$searchResults.length.toLocaleString()} results
					{/if}
				</div>
			{/if}
			{#if $searchResults.length > 0}
				<div class="user-search-results">
					{#each $searchResults.slice(0, 100) as result}
						{@const startIndex = result.toLowerCase().indexOf($query.toLowerCase())}
						{@const endIndex = startIndex + $query.length}
						{@const before = result.slice(0, startIndex)}
						{@const match = result.slice(startIndex, endIndex)}
						{@const after = result.slice(endIndex)}
						<div>
							{before}<strong>{match}</strong>{after}
						</div>
					{/each}
				</div>
			{/if}
			{#if $query.length >= 3}
				{#if $searchResults.length > 100}
					<div class="user-search-and-more-text">
						... and {($searchResults.length - 100).toLocaleString()} more
					</div>
				{/if}
			{:else if $searchResults.length > 0}
				<div class="user-search-and-more-text">...</div>
			{:else}
				<div class="user-search-stats">0 results</div>
			{/if}
		{/if}
	</div>
</div>

<style>
	.user-search {
		border: 1px solid var(--text-color-alt-3);
		border-radius: 5px;
		max-width: fit-content;
		padding: 0.5em;
		font-family: monospace;
		font-size: 1rem;
	}

	input {
		background-color: var(--background-color-alt);
		border: 1px solid var(--text-color-alt-3);
		color: var(--text-color);
		width: 10em;
		font-size: 1rem;
		font-family: inherit;
	}

	.user-search-stats {
		margin-top: 0.25em;

		color: var(--text-color-alt-3);
	}
	.user-search-results {
		margin-top: 0.1em;
	}

	.user-search-and-more-text {
		color: var(--text-color-alt-3);
		font-style: italic;
	}

	.user-search-noscript {
		border: 1px solid var(--text-color-alt-3);
		border-radius: 5px;
		max-width: fit-content;
		padding: 0.5em;
		font-size: 1rem;
	}
</style>
