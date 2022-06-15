<script lang="ts">
	import GitHubIcon from '$lib/Icon/GitHub.svelte'
	import ButtonRow from './ButtonRow.svelte'
	import IconButtonRow from './IconButtonRow.svelte'

	export let name: string
	export let href: string | undefined = undefined

	/** A link to where the code is hosted. */
	export let source: string | undefined = undefined

	export let archived = false

	export let rust = false
	export let svelte = false
	export let javascript = false
	export let typescript = false
	export let python = false
</script>

<div class="project-container">
	<div class="project-background-container">
		<div class="project-background" />
	</div>
	<div class="project">
		{#if href}
			<a {href} class:no-link={archived}>
				<h2>{name}</h2>
			</a>
		{:else}
			<h2 class="no-link">{name}</h2>
		{/if}
		{#if source}
			<IconButtonRow>
				<a href={source} class="source">
					{#if source.startsWith('https://github.com/')}
						<GitHubIcon />
					{:else}
						<GitHubIcon />
					{/if}
				</a>
			</IconButtonRow>
		{/if}
		<p><slot /></p>
	</div>
</div>

<style>
	.project-container {
		height: 100vh;
		width: 100%;
		display: grid;
		align-items: center;
		position: relative;
	}
	.project {
		margin: auto auto;
		position: relative;
	}
	h2 {
		margin: 0;
	}
	a {
		text-decoration: none;
		color: inherit;
		/* gets rid of the extra space at the bottom of the element */
		display: flex;
	}
	.no-link {
		text-decoration: line-through;
	}
	.project-background-container {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
	.project-background {
		left: 50%;
		margin-left: -50vw;
		margin-right: -50vw;
		max-width: 100vw;
		position: relative;
		right: 50%;
		width: 100vw;
		height: 100%;
	}
</style>
