<script context="module" lang="ts">
	import type { ErrorLoad } from '@sveltejs/kit'

	export const load: ErrorLoad = ({ error, status }) => {
		return {
			props: {
				status,
				message: error?.message,
			},
		}
	}
</script>

<script lang="ts">
	export let status: number
	export let message: string
</script>

<nav>
	<a href="/" class="back-anchor">← Home</a>
</nav>
<section class="error-page">
	<div>
		<h1>{status}</h1>
		<h2>{message}</h2>
	</div>
</section>

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
		color: var(--text-color-alt-3);
		font-weight: normal;
	}

	.back-anchor {
		color: var(--text-color-alt-2);
		text-decoration: none;
	}
</style>
