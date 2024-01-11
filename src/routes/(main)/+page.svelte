<script lang="ts">
	import Head from '$lib/Head.svelte'
	import { onMount } from 'svelte'
	import GitHubIcon from '$lib/Icon/GitHub.svelte'
	import MatrixIcon from '$lib/Icon/Matrix.svelte'
	import KofiIcon from '$lib/Icon/Kofi.svelte'
	import ButtonRow from '$lib/ButtonRow.svelte'
	import IconButtonRow from '$lib/IconButtonRow.svelte'

	let titleEl: HTMLParagraphElement

	onMount(async () => {
		const delays = [60, 63, 126, 19, 88, 95, 91, 61, 83] as const
		const titleContent = titleEl.textContent ?? ''
		titleEl.textContent = ''
		for (let i = 0; i <= titleContent.length; i++) {
			titleEl.textContent = titleContent.slice(0, i + 1)
			await new Promise((r) => setTimeout(r, delays[i]))
		}
	})
</script>

<svelte:head>
	<link rel="alternate" type="application/rss+xml" title="RSS" href="/blog.rss" />
	<link rel="alternate" type="application/atom+xml" title="Atom" href="/blog.atom" />
</svelte:head>

<Head />

<div class="section-container">
	<section id="main-index-page-section">
		<h1 bind:this={titleEl} id="main-title">matdoesdev</h1>

		<IconButtonRow>
			<a href="//github.com/mat-1"><GitHubIcon /></a>
			<a href="//matrix.to/#/@mat:matdoes.dev"><MatrixIcon /></a>
			<a href="//ko-fi.com/matdoesdev"><KofiIcon /></a>
		</IconButtonRow>

		<p>I'm mat, I do full-stack software development.</p>
		<p>This portfolio contains my blog posts and links to some of the projects I've made.</p>
		<ButtonRow>
			<a href="/blog" class="button">Blog</a>
			<a href="/projects" class="button">Projects</a>
		</ButtonRow>
	</section>
</div>

<style>
	.section-container {
		margin: 0 auto;
		display: flex;
		justify-content: center;
		flex-direction: column;
		height: 100%;
		width: fit-content;
	}
	section {
		width: fit-content;
		margin: 0 auto;
		max-width: 25em;
	}
	h1 {
		text-align: center;
		margin: 0;
		font-size: 2rem;
		font-weight: normal;
	}
	h1:first-letter {
		text-shadow: 0 0 0.15em var(--text-color);
	}
	p {
		margin: 0.25em;
	}
</style>
