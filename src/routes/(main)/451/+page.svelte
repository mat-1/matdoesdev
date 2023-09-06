<script lang="ts">
	import BackAnchor from '$lib/BackAnchor.svelte'
</script>

<nav>
	<BackAnchor href="/" />
</nav>
<section class="error-page">
	<div>
		<h1>451</h1>
		<a href="/old"><h2>Unavailable For Legal Reasons</h2></a>
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

	a {
		text-decoration: none;
	}
</style>
