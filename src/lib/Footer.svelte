<script lang="ts">
	import { browser } from '$app/environment'

	// + 1 because i live in the future
	const actualCopyrightYear = getActualCopyrightYear()
	let copyrightYear = $state(getStoredCopyrightYear())
	let copyrightRotateDeg = $derived(copyrightYear - actualCopyrightYear)

	function clickCopyrightYear() {
		copyrightYear += 1
		localStorage.setItem('copyrightYear', String(copyrightYear))
	}

	function getStoredCopyrightYear() {
		if (browser) {
			// update copyright year from local storage
			const storedCopyrightYear = localStorage.getItem('copyrightYear')
			if (storedCopyrightYear) {
				return Number(storedCopyrightYear)
			}
		}
		return getActualCopyrightYear()
	}
	function getActualCopyrightYear() {
		// + 1 because i live in the future
		return new Date().getFullYear() + 1
	}
</script>

<footer>
	<span
		class="copyright"
		onclick={clickCopyrightYear}
		onkeydown={clickCopyrightYear}
		role="button"
		tabindex="0"
	>
		<span class="copyright-symbol" style="transform:rotateY(0deg) rotate({copyrightRotateDeg}deg)"
			>&copy;</span
		>
		<span class="copyright-year">{copyrightYear}</span> mat
	</span>
</footer>

<style>
	footer {
		text-align: center;
		flex: 0 0;
		color: var(--text-color-alt-3);
	}

	.copyright {
		cursor: pointer;
		user-select: none;
	}
	.copyright-year {
		width: 2.3em;
		display: inline-block;
		white-space: nowrap;
		text-align: left;
	}
	.copyright-symbol {
		display: inline-block;
		line-height: 1;
		transform-origin: 50% 50%;
		/* fixes jitter when clicking fast enough */
		transition: transform 100ms;
	}
</style>
