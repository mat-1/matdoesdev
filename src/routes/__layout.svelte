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
		margin: 1em;
		flex: 1 0;
	}
	footer {
		text-align: center;
		flex: 0 0;
	}
</style>
