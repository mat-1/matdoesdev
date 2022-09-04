<script lang="ts">
	import Server from './Server.svelte'
	import { fade, fly } from 'svelte/transition'
	import LoadingDots from '$lib/LoadingDots.svelte'

	let servers: any[] | undefined
	let index = 0
	let loading = false

	async function fetchServers(): Promise<void> {
		if (loading) return
		try {
			loading = true
			const response = await fetch('https://minecraft-server-dispenser.mat1.repl.co')
			const data = await response.json()
			loading = false
			servers = data
			index = Math.floor(Math.random() * servers!.length)
		} catch (error) {
			console.error(error)
			await new Promise((resolve) => setTimeout(resolve, 1000))
			return await fetchServers()
		}
	}

	function nextServer() {
		if (!servers) fetchServers()
		else index = (index + 1) % servers.length
	}
</script>

<button on:click={nextServer}>
	{#if servers}Next{:else}Show{/if}
</button>
<div class="random-servers">
	{#if servers}
		{#key index}
			<div class="server" in:fly={{ x: -50, duration: 200 }} out:fly={{ x: 50, duration: 200 }}>
				<Server data={servers[index]} />
			</div>
		{/key}
	{:else if loading}
		<div class="loading">
			<LoadingDots />
		</div>
	{/if}
</div>

<style>
	.server {
		position: absolute;
	}
	.random-servers {
		height: 6em;
		width: 100%;
	}
	.loading {
		/* centered */
		position: relative;
		width: fit-content;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
