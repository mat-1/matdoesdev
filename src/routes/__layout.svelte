<script lang="ts">
	import '../app.css'

	export const copyrightYear = new Date().getFullYear()
</script>

<div id="page">
	<main>
		<slot />
	</main>

	<footer>
		<p>&copy; {copyrightYear} matdoesdev</p>
	</footer>
</div>

<style>
	#page {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: stretch;
		overflow-x: hidden;
		overflow-wrap: break-word;
	}

	main {
		padding: 1em;
		margin: auto;
		flex: 1 0;
		max-width: 50em;
		width: calc(100% - 2em);
	}
	footer {
		text-align: center;
		flex: 0 0;
		color: var(--text-color-alt-3);
	}
</style>
