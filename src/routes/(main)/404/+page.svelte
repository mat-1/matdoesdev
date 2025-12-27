<script lang="ts">
	import { browser } from '$app/environment'
	import BackAnchor from '$lib/BackAnchor.svelte'

	let el: HTMLDivElement = $state()

	let idleModeEnabled = $state(false)

	// if there's no mouse move or key presses for 5 seconds, enable idle mode

	function createIdleTimeout() {
		return setTimeout(() => {
			idleModeEnabled = true
		}, 60000)
	}

	let idleTimeout = createIdleTimeout()

	const resetIdleTimeout = () => {
		clearTimeout(idleTimeout)
		idleTimeout = createIdleTimeout()
	}

	let x = 0
	let y = 0
	let xVel = $state(2)
	let yVel = $state(2)
	let hue: null | number = null
	function animate() {
		requestAnimationFrame(animate)
		if (!idleModeEnabled || !el) return

		const { width, height } = el.getBoundingClientRect()

		x += xVel
		y += yVel

		const minX = -window.innerWidth / 2 + width / 2
		const maxX = window.innerWidth / 2 - width / 2

		const minY = -window.innerHeight / 2 + height / 2
		const maxY = window.innerHeight / 2 - height / 2 - 2

		function hitWall() {
			hue = Math.random() * 360
			el.style.color = `hsl(${hue}, 100%, 50%)`
		}

		if (x > maxX) {
			xVel *= -1
			while (x > maxX) x -= Math.abs(xVel)
			hitWall()
		}
		if (x < minX) {
			xVel *= -1
			while (x < minX) x += Math.abs(xVel)
			hitWall()
		}

		if (y > maxY) {
			yVel *= -1
			while (y > maxY) y -= Math.abs(yVel)
			hitWall()
		}
		if (y < minY) {
			yVel *= -1
			while (y < minY) y += Math.abs(yVel)
			hitWall()
		}

		el.style.transform = `translate(${x}px, ${y}px)`
	}
	if (browser) animate()
</script>

<svelte:window onmousemove={resetIdleTimeout} onkeydown={resetIdleTimeout} />

<main>
	<nav>
		<BackAnchor href="/" />
	</nav>
	<section class="error-page">
		<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
		<div
			bind:this={el}
			class:bouncing={idleModeEnabled}
			onmousedown={() => {
				if (idleModeEnabled) {
					if (Math.random() < 0.5) {
						xVel *= -1.2
					} else {
						yVel *= -1.2
					}
				}
			}}
		>
			<h1>404</h1>
			<h2>Not found</h2>
		</div>
	</section>
</main>

<style>
	.error-page {
		max-width: fit-content;
		text-align: center;
		margin: 0 auto;

		display: flex;
		justify-content: center;
		flex-direction: column;
		height: 100%;
	}

	h1 {
		margin: 0;
		font-size: 5rem;
	}

	h2 {
		margin: 0;
		/* color: var(--text-color-alt-3); */
		opacity: 0.62;
		font-weight: normal;
	}

	.bouncing {
		cursor: pointer;
		user-select: none;
	}
</style>
