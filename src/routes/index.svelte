<script context="module" lang="ts">
	export const prerender = true
	export const router = false
</script>

<script lang="ts">
	import Head from '$lib/Head.svelte'
	import { onMount } from 'svelte'
	import { fade } from 'svelte/transition'
	import { flip } from 'svelte/animate'

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

<Head />

<div class="section-container">
	<section>
		<h1 bind:this={titleEl}>matdoesdev</h1>

		<div class="button-row social-media-row">
			<a href="//github.com/mat-1"><img src="/icons/github.svg" class="icon" alt="GitHub" /></a>
		</div>

		<p>I'm mat, I do full-stack software development.</p>
		<p>This portfolio contains my blog posts and links to some of the projects I've made.</p>
		<div class="button-row">
			<a href="/blog" class="button">Blog</a>
			<a href="/projects" class="button">Projects</a>
		</div>
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
	.button-row {
		width: fit-content;
		margin: 0.5em auto;
		display: flex;
		gap: 0.5em;
	}
	.icon {
		height: 1em;
		opacity: 0.5;
		transition: opacity 200ms;
	}
	.icon:hover {
		opacity: 0.9;
	}
	.social-media-row {
		font-size: 1.25em;
	}
</style>
