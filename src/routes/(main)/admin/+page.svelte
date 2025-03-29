<script lang="ts">
	import { onMount } from 'svelte'
	import AdminGraph from './AdminGraph.svelte'
	import { browser } from '$app/environment'

	let uptimeSeconds = $state<number | undefined>()

	let memoryUsed = $state<number | undefined>()
	let memoryUsedHistory = $state<number[]>([])
	let memoryTotal = $state<number | undefined>()

	let cpuUsage = $state<number | undefined>()
	let cpuUsageHistory = $state<number[]>([])

	let storageUsed = $state<number | undefined>()
	let storageTotal = $state<number | undefined>()

	let logs = $state<string[]>([])

	function renderUptime(secs: number) {
		const hours = Math.floor(secs / 3600)
		const minutes = Math.floor((secs % 3600) / 60)
		const seconds = secs % 60
		return `${hours}h ${minutes}m ${seconds}s`
	}

	async function shutdown() {
		await fetch('/admin/api/shutdown', { method: 'POST' })
		// shutdown animation
		document.body.classList.add('shutdown')
		await new Promise((resolve) => setTimeout(resolve, 3000))
		location.reload()
	}
	async function reboot() {
		await fetch('/admin/api/reboot', { method: 'POST' })
		document.body.classList.add('shutdown')
		await new Promise((resolve) => setTimeout(resolve, 3000))
		location.reload()
	}

	let logsEl: HTMLDivElement

	function startEventSource() {
		const es = new EventSource('/admin/api/stats')
		es.addEventListener('message', (event) => {
			console.log(JSON.parse(event.data))
			const data = JSON.parse(event.data)
			uptimeSeconds = data.uptime as number
			memoryUsed = data.memory.used as number
			if (memoryUsedHistory.length > 40) {
				memoryUsedHistory = memoryUsedHistory.slice(1)
			}
			memoryUsedHistory = [...memoryUsedHistory, memoryUsed]
			memoryTotal = data.memory.total as number
			cpuUsage = data.cpu as number
			if (cpuUsageHistory.length > 40) {
				cpuUsageHistory = cpuUsageHistory.slice(1)
			}
			cpuUsageHistory = [...cpuUsageHistory, cpuUsage]
			storageUsed = data.storage.used as number
			storageTotal = data.storage.total as number

			// scroll down logs
			const isLogsNearBottom =
				Math.abs(logsEl.scrollHeight - logsEl.clientHeight - logsEl.scrollTop) <= 10

			logs = [...logs, ...data.logs]
			if (logs.length > 255) {
				logs = logs.slice(logs.length - 255)
			}

			requestAnimationFrame(() => {
				if (isLogsNearBottom) {
					logsEl.scrollTop = logsEl.scrollHeight
				}
			})
		})

		es.addEventListener('error', (event) => {
			console.error('EventSource error', event)
			// reopen
			es.close()
			setTimeout(startEventSource, 1000)
		})

		return () => es.close()
	}

	onMount(() => {
		if (browser) {
			const close = startEventSource()
			return close
		}
	})
</script>

<h1>Admin</h1>

<noscript>
	<p>JavaScript is required to view this page.</p>
	<style>
		.admin {
			display: none;
		}
	</style>
</noscript>

{#if uptimeSeconds === undefined}
	<p>Loading...</p>
	<style>
		.admin {
			display: none;
		}
	</style>
{/if}
<div class="admin">
	<section class="container danger-buttons">
		<button class="danger-button" onclick={reboot}>Reboot</button>
		<button class="danger-button" onclick={shutdown}>Shut down</button>
	</section>

	{#if uptimeSeconds !== undefined}
		<section class="container">
			<span class="name">Uptime</span>:
			<span class="value">{renderUptime(uptimeSeconds)}</span>
		</section>
	{/if}

	<div class="chart-sections">
		<span class="left">
			{#if memoryTotal !== undefined}
				<section class="container">
					<div>
						<span class="name">Memory usage</span>:
						<span class="value">{memoryUsed} GiB</span>/{memoryTotal} GiB
					</div>
					<AdminGraph history={memoryUsedHistory} max={memoryTotal} color="#0dc7f9aa"></AdminGraph>
				</section>
			{/if}

			<section class="container">
				<span>Logs:</span>
				<div class="logs" bind:this={logsEl}>
					{#each logs as log}
						<div>{log}</div>
					{/each}
				</div>
			</section>
		</span>

		<span class="right">
			{#if cpuUsage !== undefined}
				<section class="container">
					<span class="name">CPU</span>: <span class="value">{Math.round(cpuUsage * 100)}%</span>
					<AdminGraph history={cpuUsageHistory} max={1} color="#aad94caa"></AdminGraph>
				</section>
			{/if}

			{#if storageUsed !== undefined && storageTotal !== undefined}
				<section class="container">
					<span class="name">Storage</span>:
					<span class="value">{storageUsed} GiB</span>/{storageTotal}
					GiB
					<div class="bar-container">
						<div class="bar-item" style="width: {(storageUsed / storageTotal) * 100}%"></div>
					</div>
				</section>
			{/if}
		</span>
	</div>
</div>

<style>
	.danger-buttons {
		float: right;
	}
	.danger-button {
		border-color: var(--error-color);
		color: white;
	}

	.chart-sections {
		display: flex;
		justify-content: space-between;
		width: 100%;
		flex-wrap: wrap;
	}

	.value {
		font-weight: bold;
	}
	.container {
		margin-bottom: 1rem;
	}

	.logs {
		background-color: #000;
		font-family: monospace;
		width: 360px;
		height: 200px;
		overflow-wrap: anywhere;
		overflow: auto;
		border: 1px solid var(--background-color-alt-3);
		padding: 0.25rem;
	}

	.bar-container {
		border: 1px solid var(--background-color-alt-3);
		height: 20px;
		width: 100%;
		margin-top: 0.5rem;
	}
	.bar-item {
		height: 100%;
		background: linear-gradient(to right, hsl(0, 63%, 40%), hsl(0, 63%, 60%));
	}

	:global(body.shutdown) {
		animation: shutdown 0.3s linear;
		opacity: 0;
	}
	/* based on https://codepen.io/andreasantonsson/pen/OWWRGN */
	@keyframes shutdown {
		0% {
			transform: scale(1, 1);
			opacity: 1;
		}
		50% {
			transform: scale(1, 0.02);
			opacity: 0.8;
		}
		100% {
			transform: scale(0, 0);
			opacity: 0.3;
		}
	}
</style>
