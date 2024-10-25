<script lang="ts">
	interface Props {
		alt: string;
		src: string;
		href: string;
	}

	let { alt, src, href }: Props = $props();
</script>

<a {href}><img src="/retro/buttons/{src}" {alt} width="88" height="31" border="0" /></a>

<style>
	img {
		image-rendering: crisp-edges;
	}
</style>
