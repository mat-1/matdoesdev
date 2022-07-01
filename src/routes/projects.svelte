<script lang="ts" context="module">
	export const prerender = true
</script>

<script lang="ts">
	import BackAnchor from '$lib/BackAnchor.svelte'
	import Project from '$lib/Project.svelte'
	import { onMount } from 'svelte'
	import projects from './projects.json'

	let projectsEl: HTMLDivElement
	// set the --project-height on page load so it doesn't jump around later
	onMount(() => {
		document.documentElement.style.setProperty('--project-height', `${window.innerHeight}px`)
	})
</script>

<div class="projects-header">
	<nav>
		<BackAnchor href="/" />
	</nav>
	<h1>Projects</h1>
	<hr />
</div>
<div class="projects" bind:this={projectsEl}>
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
</style>
