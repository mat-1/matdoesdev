<script lang="ts">
	export let data: [string, number, string?][]

	let max = Math.max(...data.map((d) => d[1]))

	function abbreviateNumber(value: number) {
		if (value >= 10_000_000) {
			return (value / 1_000_000).toFixed(0) + 'm'
		} else if (value >= 1_000_000) {
			return (value / 1_000_000).toPrecision(2) + 'm'
		} else if (value >= 10_000) {
			return (value / 1_000).toFixed(0) + 'k'
		} else if (value >= 1_000) {
			return (value / 1_000).toPrecision(2) + 'k'
		} else {
			return value
		}
	}
</script>

<div class="bar-chart-container">
	<svg style="width:{data.length * 25}px">
		{#each data as [label, value, valueHtml], i}
			<rect
				x={i * 25}
				y={115 - (value / max) * 100}
				width="20"
				height={(value / max) * 100}
				fill="hsl(200, 50%, 50%)"
			/>
			<text x={i * 25 + 10} y="125" text-anchor="middle" fill="white" font-size="10">
				{label}
			</text>
			<text
				x={i * 25 + 10}
				y={115 - (value / max) * 100 - 5}
				text-anchor="middle"
				fill="white"
				font-size="10"
			>
				{#if valueHtml}
					{@html valueHtml}
				{:else}
					{abbreviateNumber(value)}
				{/if}
			</text>
		{/each}
	</svg>
</div>

<style>
	.bar-chart-container {
		overflow: auto;
	}
	svg {
		width: fit-content;
		height: 125px;
		overflow: auto;
	}
</style>
