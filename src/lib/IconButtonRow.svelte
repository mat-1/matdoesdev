<script>
	import ButtonRow from './ButtonRow.svelte'
</script>

<div class="icon-row">
	<ButtonRow>
		<slot />
	</ButtonRow>
</div>

<style>
	.icon-row {
		font-size: 1.25em;
	}
</style>
