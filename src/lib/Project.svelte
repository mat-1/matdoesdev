<script lang="ts">
	import GitHubIcon from '$lib/Icon/GitHub.svelte'
	import ButtonRow from './ButtonRow.svelte'
	import Icon from './Icon/Icon.svelte'
	import IconButtonRow from './IconButtonRow.svelte'

	export let name: string
	export let nextName: string | undefined
	export let href: string | undefined = undefined
	export let languages: string[] = []

	/** A link to where the code is hosted. */
	export let source: string | undefined = undefined

	export let archived = false

	function nameToId(name: string): string {
		return name.toLowerCase().replace(/\s+/g, '-')
	}

	$: id = nameToId(name)
	$: nextId = nextName ? nameToId(nextName) : undefined
</script>

<div class="project-container" {id}>
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
		<IconButtonRow>
			{#if source}
				<a href={source} class="source">
					{#if source.startsWith('https://github.com/')}
						<GitHubIcon />
					{:else}
						<GitHubIcon />
					{/if}
				</a>
			{/if}
			{#if languages.includes('python')}
				<Icon><img src="/icons/python.svg" alt="Python" /></Icon>
			{/if}
			{#if languages.includes('svelte')}
				<Icon><img src="/icons/svelte.svg" alt="Svelte" /></Icon>
			{/if}
			{#if languages.includes('rust')}
				<Icon><img src="/icons/rust.svg" alt="Rust" /></Icon>
			{/if}
			{#if languages.includes('typescript')}
				<Icon><img src="/icons/typescript.svg" alt="TypeScript" /></Icon>
			{/if}
			{#if languages.includes('javascript')}
				<Icon><img src="/icons/javascript.svg" alt="JavaScript" /></Icon>
			{/if}
		</IconButtonRow>
		<p class="project-description"><slot /></p>
	</div>
	{#if nextId}
		<a class="next-anchor" href="#{nextId}">↓ Next</a>
	{/if}
</div>

<style>
	.project-container {
		--adjusted-project-height: max(var(--project-height), 15em);
		height: var(--adjusted-project-height);
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
		text-align: center;
		width: 100%;
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
	.project-description {
		margin: 0 auto;
		width: fit-content;
		max-width: 20em;
	}
	.next-anchor {
		color: var(--text-color-alt-3);
		text-decoration: none;
		text-align: center;
		display: block;
		margin-top: 0.5em;
		position: absolute;
		bottom: calc(calc(var(--adjusted-project-height) * 0.5) - 6em);
		width: 100%;
	}
</style>
