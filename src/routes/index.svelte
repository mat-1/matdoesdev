<script context="module" lang="ts">
	export const prerender = true
</script>

<script lang="ts">
	import Head from '$lib/Head.svelte'
</script>

<Head />

<div class="section-container">
	<section>
		<h1>matdoesdev</h1>

		<div class="button-row social-media-row">
			<a href="//github.com/mat-1"><img src="/github.svg" class="icon" alt="GitHub" /></a>
			<a href="//twitter.com/mat1"><img src="/twitter.svg" class="icon" alt="Twitter" /></a>
		</div>

		<p>I'm mat, I do full-stack software development.</p>
		<p>This portfolio contains my blog posts and links to some of the projects I've made.</p>
		<div class="button-row">
			<a href="/blog"><button>Blog</button></a>
			<a href="/projects"><button>Projects</button></a>
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
	}
	.icon:hover {
		opacity: 0.9;
		transition: opacity 500ms;
	}
	.social-media-row {
		font-size: 1.25em;
	}
</style>
