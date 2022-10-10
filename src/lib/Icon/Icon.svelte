<span class="icon">
	<slot />
</span>

<style>
	.icon {
		height: 1em;
		width: 1em;
		opacity: 0.5;
		transition: opacity 200ms;
		display: block;
	}
	.icon :global(img) {
		display: block;
		margin: 0 auto;
	}
	:global(a) .icon:hover {
		opacity: 0.9;
	}
</style>
