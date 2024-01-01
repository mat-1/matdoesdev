<script lang="ts">
	import { data } from './88x31'
	import ExternalLinkIcon from './ExternalLinkIcon.svelte'

	export let pageIndex: number

	function cutOff(str: string, length: number) {
		if (str.length <= length) return str
		return str.slice(0, length - 1) + '…'
	}
</script>

<div>
	<a href="/buttons#{data.pages[pageIndex]}">{cutOff(data.pages[pageIndex], 32)}</a>
	<a href="https://{data.pages[pageIndex]}">
		<ExternalLinkIcon />
	</a>
</div>

<style>
	a {
		word-break: break-all;
		overflow: hidden;
		width: fit-content;
	}
</style>
