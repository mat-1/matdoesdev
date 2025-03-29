<script lang="ts">
	interface Props {
		history: number[]
		max: number
		color: string
	}

	let { history, max, color }: Props = $props()

	const width = 360
	const height = 200

	function makePath(history: number[], max: number) {
		let path = ''
		for (let i = 0; i < history.length; i++) {
			const value = history[i]
			const x = i === 0 ? 0 : (i / (history.length - 1)) * width
			const y = (1 - value / max) * height
			if (i === 0) {
				path += `M ${x},${y}`
			} else {
				path += ` L ${x},${y}`
			}
		}
		// fill the rest

		// right of end
		path += ` L ${width + 10},${(1 - history[history.length - 1] / max) * height}`
		// bottom right
		path += ` L ${width + 10},${height + 10}`
		// bottom left
		path += ` L -10,${height + 10}`
		// left of start
		path += ` L -10,${(1 - history[0] / max) * height}`
		// close
		path += ` Z`
		return path
	}

	let path = $derived(makePath(history, max))
</script>

<div class="graph" style="width: {width}px; height: {height}px">
	<svg viewBox="0 0 {width} {height}" xmlns="http://www.w3.org/2000/svg">
		<path d={path} stroke="var(--text-color)" stroke-width="2" fill={color}></path>
	</svg>
</div>

<style>
	.graph {
		--line-color: var(--background-color-alt-3);
		/* grid lines */
		--grid-size: 20px;
		background:
			linear-gradient(to right, var(--line-color) 1px, transparent 1px) 0 0 / var(--grid-size) 100%,
			linear-gradient(to bottom, var(--line-color) 1px, transparent 1px) 0 0/100% var(--grid-size);
		box-shadow:
			0 0 0 1px var(--line-color) inset,
			0 0 0 1px var(--line-color) inset;
	}
</style>
