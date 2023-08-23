<script lang="ts">
	import BackAnchor from '$lib/BackAnchor.svelte'
</script>

<nav>
	<BackAnchor href="/" />
</nav>
<section class="error-page">
	<div>
		<h1>404</h1>
		<h2>Not found</h2>
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
</style>
