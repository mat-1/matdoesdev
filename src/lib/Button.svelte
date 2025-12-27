<script lang="ts">
	interface Props {
		alt: string
		src: string
		href: string
	}

	let { alt, src, href }: Props = $props()
</script>

<a {href}><img src="/buttons/{src}" {alt} width="88" height="31" border="0" /></a>

<style>
	img {
		image-rendering: crisp-edges;

		transition: outline 100ms;
		outline: 1px solid transparent;
	}

	a:hover img {
		outline: 1px solid #fff;
	}
	a {
		outline: none;
	}
	a:focus img {
		outline: 1px solid #fff;
	}
</style>
