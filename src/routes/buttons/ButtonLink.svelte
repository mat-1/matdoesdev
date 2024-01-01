<script lang="ts">
	import { buttonHashFromIndex, buttonUrlFromIndex, data } from './88x31'
	import ExternalLink from './ExternalLink.svelte'
	import ExternalLinkIcon from './ExternalLinkIcon.svelte'

	export let pageIndex: number
	export let buttonIndex: number
</script>

<div class="button-with-link-container">
	{#if pageIndex !== null}
		<ExternalLink {pageIndex} />
	{/if}
	<a href="/buttons#{buttonHashFromIndex(buttonIndex)}">
		<img src={buttonUrlFromIndex(buttonIndex)} alt="Button" class="button" />
	</a>
</div>

<style>
	.button-with-link-container {
		display: inline-flex;
		flex-direction: column;
		max-width: 100px;
	}
</style>
