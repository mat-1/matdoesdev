<script lang="ts">
	import BackAnchor from '$lib/BackAnchor.svelte'
	import Project from '$lib/Project.svelte'
	import { onMount } from 'svelte'
	import projects from '../../_projects.json'

	// set the --project-height on page load so it doesn't jump around later
	onMount(() => {
		document.documentElement.style.setProperty('--project-height', `${window.innerHeight}px`)
	})

	// the timestamp for when we were last at scroll == 0
	let timestampAtLastTop = 0

	function onScroll() {
		const isAtTop = window.scrollY === 0
		const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight

		if (isAtTop) {
			timestampAtLastTop = Date.now()
		} else if (isAtBottom && Date.now() - timestampAtLastTop > 1000) {
			// this means we scrolled to the bottom in less than a second, do shake effect
			document.body.classList.add('shake1')
		}
	}
</script>

<svelte:body on:scroll={onScroll} />

<div class="projects-header">
	<nav>
		<BackAnchor href="/" />
	</nav>
	<h1>Projects</h1>
	<hr />
</div>
<div class="projects">
	{#each projects as project, i}
		<Project
			name={project.name}
			href={project.href}
			source={project.source}
			languages={project.languages}
			nextName={projects[i + 1]?.name}
		>
			{project.description}
		</Project>
	{/each}
</div>

<style>
	.projects-header {
		position: absolute;
		z-index: 10;
	}
	.projects {
		position: relative;
	}

	:root {
		--project-height: 100vh;
	}

	.projects > :global(*:nth-child(even) .project-background) {
		background-color: var(--background-color-alt);
	}

	:global(body.shake1) {
		animation: shake1 0.5s;
	}
	@keyframes shake1 {
		0% {
			transform: translate(1px, 1px) rotate(0deg);
		}
		10% {
			transform: translate(-1px, -2px) rotate(-1deg);
		}
		20% {
			transform: translate(-3px, 0px) rotate(1deg);
		}
		30% {
			transform: translate(3px, 2px) rotate(0deg);
		}
		40% {
			transform: translate(1px, -1px) rotate(1deg);
		}
		50% {
			transform: translate(-1px, 2px) rotate(-1deg);
		}
		60% {
			transform: translate(-3px, 1px) rotate(0deg);
		}
		70% {
			transform: translate(3px, 1px) rotate(-1deg);
		}
		80% {
			transform: translate(-1px, -1px) rotate(1deg);
		}
		90% {
			transform: translate(1px, 2px) rotate(0deg);
		}
		100% {
			transform: translate(1px, -2px) rotate(-1deg);
		}
	}
</style>
