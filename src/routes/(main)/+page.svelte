<script lang="ts">
	import Head from '$lib/Head.svelte'
	import { onMount } from 'svelte'
	import GitHubIcon from '$lib/Icon/GitHub.svelte'
	import MatrixIcon from '$lib/Icon/Matrix.svelte'
	import KofiIcon from '$lib/Icon/Kofi.svelte'
	import Topography from '$lib/assets/topography.svg'
	import sparkles from '$lib/assets/sparkles.gif'
	import PostPreview from '$lib/PostPreview.svelte'
	import type { PageProps } from './$types'
	import Buttons from '$lib/Buttons.svelte'
	import projects from '../_projects.json'
	import EnvelopeIcon from '$lib/Icon/Envelope.svelte'
	import KeyIcon from '$lib/Icon/Key.svelte'
	import Fediverse from '$lib/Icon/Fediverse.svelte'
	import { initNeko } from '../neko/oneko'
	import '../neko/oneko.css'
	import sandcat2 from '$lib/sandcat2.svg'
	import TorIcon from '$lib/Icon/Tor.svelte'

	let { data }: PageProps = $props()
	const posts = data.posts

	// onMount(async () => {
	// 	maybeAddRandomBackground()
	// })

	function maybeAddRandomBackground() {
		// get css variable background-color-alt
		const backgroundAltColor = getComputedStyle(document.body).getPropertyValue(
			'--background-color-alt'
		)
		// sourced from https://heropatterns.com
		const backgroundUrls = [
			// texture (small dots)
			'data:image/svg+xml,' +
				encodeURIComponent(
					`<svg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'><path fill='${backgroundAltColor}' fill-opacity='0.44' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'></path></svg>`
				),
			// topography
			Topography,

			// signal (random rectangles)
			'data:image/svg+xml,' +
				encodeURIComponent(
					`<svg width='84' height='48' viewBox='0 0 84 48' xmlns='http://www.w3.org/2000/svg'><path d='M0 0h12v6H0V0zm28 8h12v6H28V8zm14-8h12v6H42V0zm14 0h12v6H56V0zm0 8h12v6H56V8zM42 8h12v6H42V8zm0 16h12v6H42v-6zm14-8h12v6H56v-6zm14 0h12v6H70v-6zm0-16h12v6H70V0zM28 32h12v6H28v-6zM14 16h12v6H14v-6zM0 24h12v6H0v-6zm0 8h12v6H0v-6zm14 0h12v6H14v-6zm14 8h12v6H28v-6zm-14 0h12v6H14v-6zm28 0h12v6H42v-6zm14-8h12v6H56v-6zm0-8h12v6H56v-6zm14 8h12v6H70v-6zm0 8h12v6H70v-6zM14 24h12v6H14v-6zm14-8h12v6H28v-6zM14 8h12v6H14V8zM0 8h12v6H0V8z' fill='${backgroundAltColor}' fill-opacity='0.4' fill-rule='evenodd'/></svg>`
				),
			// bubbles
			'data:image/svg+xml,' +
				encodeURIComponent(
					`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><path fill="${backgroundAltColor}" fill-rule="evenodd" d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm48 25a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm-43-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm63 31a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM34 90a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm56-76a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12 86a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm28-65a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm23-11a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm-6 60a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm29 22a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM32 63a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm57-13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm-9-21a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM60 91a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM35 41a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM12 60a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/></svg>`
				),
			// plus
			'data:image/svg+xml,' +
				encodeURIComponent(
					`<svg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'><g fill='none' fill-rule='evenodd'><g fill='${backgroundAltColor}' fill-opacity='0.4'><path d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/></g></g></svg>`
				),
		]

		const backgroundIndex = localStorage.getItem('backgroundIndex')
		if (!backgroundIndex) {
			const shouldGetBackground = Math.random() < 0.01
			localStorage.setItem(
				'backgroundIndex',
				shouldGetBackground ? String(Math.floor(Math.random() * backgroundUrls.length)) : '-1'
			)
		}

		if (backgroundIndex !== '-1') {
			const chosenBackgroundUrl = backgroundUrls[Number(backgroundIndex)]
			document.body.style.backgroundImage = `url("${chosenBackgroundUrl}")`
		}
	}

	const defaultSentence1 =
		"hii, thanks for stopping by. i'm mat, and i make things on the internet."
	const defaultSentence2 = 'this is my personal web site on the world wide web.'

	let titleClickCount = 0
	let titleEditable = $state(false)
	function onTitleClicked() {
		titleClickCount++
		if (titleClickCount >= 5) {
			titleEditable = true
		}
	}
	let sentence1 = $state(defaultSentence1)
	let sentence2 = $state(defaultSentence2)
	let defaultCopyrightText: string | undefined = undefined

	let sandcatModeEnabled = false
	async function startSandcatMode() {
		if (sandcatModeEnabled) return
		sandcatModeEnabled = true
		const sandcatUrls = []
		for (let i = 1; i <= 254; i++) {
			sandcatUrls.push(`https://matdoes.dev/sandcats/${i}.jpg`)
		}

		const sandcatContainerEl = document.createElement('div')
		sandcatContainerEl.style.position = 'fixed'
		sandcatContainerEl.style.top = '0'
		sandcatContainerEl.style.left = '0'
		sandcatContainerEl.style.width = 'calc(100% + 2560px)'
		sandcatContainerEl.style.height = '100%'
		sandcatContainerEl.style.zIndex = '-1'
		sandcatContainerEl.style.lineHeight = '0'
		document.body.appendChild(sandcatContainerEl)

		document.body.classList.add('sandcat-mode')

		let mustWait = true

		;(async () => {
			// move sandcatContainerEl down slowly
			let lastScrollTime = Date.now()
			let scrollAmount = 0
			while (true) {
				if (mustWait) {
					await new Promise((r) => setTimeout(r, 100))
					lastScrollTime = Date.now()
					continue
				}
				const timeElapsed = Date.now() - lastScrollTime
				lastScrollTime += timeElapsed
				scrollAmount += timeElapsed / 10
				sandcatContainerEl.style.top = `-${scrollAmount}px`
				await new Promise(requestAnimationFrame)
			}
		})()

		while (true) {
			// shuffle sandcatUrls
			for (let i = sandcatUrls.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1))
				;[sandcatUrls[i], sandcatUrls[j]] = [sandcatUrls[j], sandcatUrls[i]]
			}

			// we shuffle and then loop instead of picking a random item each time so it's less
			// likely that the same image shows up consecutively

			// add the sandcats
			for (const url of sandcatUrls) {
				const imgEl = document.createElement('img')
				imgEl.src = url
				sandcatContainerEl.appendChild(imgEl)
				// wait for it to load and continue
				await new Promise((r) => {
					imgEl.onload = r
				})

				// if the image is waaay off the screen then we gotta wait
				while (imgEl.getBoundingClientRect().top > window.innerHeight + 256) {
					mustWait = false
					await new Promise((r) => setTimeout(r, 100))
				}
				mustWait = imgEl.getBoundingClientRect().top < window.innerHeight
			}
		}
	}

	function onTitleEdited(e: Event) {
		const content = ((e as InputEvent).target as HTMLTitleElement).textContent as string

		const copyrightEl = document.getElementsByClassName('copyright')[0]
		if (defaultCopyrightText === undefined) defaultCopyrightText = copyrightEl.textContent as string
		let copyrightText = defaultCopyrightText

		const titleEl = document.getElementsByTagName('title')[0]

		if (/\b(sand|samd)?(cat|cta|car)\b/.test(content)) {
			sentence1 = 'meow meow, mew meow meow mrrp meow nyaa :3'
			sentence2 = 'meeeoooww ^-^ purr~ meow meow mrrp meow nya meow nyaaa meow nyaa nyaa :3'
			copyrightText = defaultCopyrightText.replace('mat', 'mta')
			startSandcatMode()
			titleEl.textContent = "mta's site :3"
		} else if (/^welcome to ([a-z0-9]+)'?s site!*/i.test(content)) {
			let name = content.split(' ')[2].split("'")[0]
			name = name.trim()
			sentence1 = defaultSentence1.replace('mat', name)
			// if (action !== 'dev') {
			// 	sentence1 = sentence1.replace('full-stack software development', action)
			// }
			sentence2 = defaultSentence2
			copyrightText = defaultCopyrightText.replace('mat', name)
			titleEl.textContent = `${name}'s site :3`
		} else {
			sentence1 = defaultSentence1
			sentence2 = defaultSentence2
			copyrightText = defaultCopyrightText
		}

		copyrightEl.textContent = copyrightText
	}

	function onTitleKeypress(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault()
		}
	}

	// can't make the height for the parallax effect be correct without js :(
	let indexContainerHeight = $state(0)

	// cheater :(
	const mysteryLinks = [
		'/index.html/index.html',
		'/lightswitch',
		'/neko',
		'/retro',
		'/wp-login.php',
		'/?stake',
		'/buttons',
		'/index.txt',
		'/qotd',
		'https://matdoes.dev:3',
	]

	let mysteryLink = mysteryLinks[Math.floor(Math.random() * mysteryLinks.length)]
	let mysteryLinkContainerEl: HTMLParagraphElement
	onMount(() => {
		if (Math.random() < 0.1) {
			mysteryLinkContainerEl.style.display = 'block'
		}
	})

	let nekoEl: HTMLDivElement
	let nekoSpriteName: keyof typeof nekoSpriteIdsToNames = 'idle'
	onMount(() => {
		const startFollowingMouse = initNeko(nekoEl, (spriteName) => {
			nekoSpriteName = spriteName as any
		})
		nekoEl.onclick = startFollowingMouse
	})

	const nekoSpriteIdsToNames = {
		idle: 'Idle',
		alert: 'Alert',
		scratchSelf: 'Idle',
		scratchWallN: 'Idle',
		scratchWallS: 'Idle',
		scratchWallE: 'Idle',
		scratchWallW: 'Idle',
		tired: 'Tired',
		sleeping: 'Sleeping',
		N: 'Chasing',
		NE: 'Chasing',
		E: 'Chasing',
		SE: 'Chasing',
		S: 'Chasing',
		SW: 'Chasing',
		W: 'Chasing',
		NW: 'Chasing',
	}
	const nekoSpriteIdsToStatuses = {
		idle: 'idle',
		alert: 'down',
		scratchSelf: 'idle',
		scratchWallN: 'idle',
		scratchWallS: 'idle',
		scratchWallE: 'idle',
		scratchWallW: 'idle',
		tired: 'idle',
		sleeping: 'idle',
		N: 'up',
		NE: 'up',
		E: 'up',
		SE: 'up',
		S: 'up',
		SW: 'up',
		W: 'up',
		NW: 'up',
	}
</script>

<svelte:head>
	<link rel="alternate" type="application/rss+xml" title="RSS" href="/blog.rss" />
	<link rel="alternate" type="application/atom+xml" title="Atom" href="/blog.atom" />
	<meta name="ICBM" content="39.0175416, -77.4659481" />
</svelte:head>

<Head />

<svelte:body />

<!-- <div id="index-background-container"> -->
<div id="index-background" style="height:calc({indexContainerHeight / 2 + 10}px + 50vh)"></div>
<!-- </div> -->
<main bind:clientHeight={indexContainerHeight}>
	<div class="section-container">
		<section id="main-index-page-section">
			<div id="main-title-effect-container">
				<img src={sparkles} alt="sparkles" class="sparkles" width="100" height="100" />
				<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
				<div id="main-title-container">
					<h1
						id="main-title"
						onclick={onTitleClicked}
						contenteditable={titleEditable}
						oninput={onTitleEdited}
						onkeydown={onTitleKeypress}
						spellcheck="false"
					>
						welcome to mat's site!!!
					</h1>
					<script>
						;(async () => {
							const titleEl = document.getElementById('main-title')
							const titleContent = titleEl.textContent ?? ''
							titleEl.textContent = ''
							await new Promise((r) => setTimeout(r, 300))
							for (let i = 0; i <= titleContent.length; i++) {
								titleEl.textContent = titleContent.slice(0, i + 1)
								await new Promise((r) => setTimeout(r, Math.random() * 30 + 40))
							}
						})()
					</script>
					<span id="main-title-cover">welcome to mat's site!!!</span>
				</div>
				<img src={sparkles} alt="sparkles" class="sparkles" width="100" height="100" />
			</div>

			<div class="page-description">
				<p>{sentence1}</p>
				<p>{sentence2} <img src={sandcat2} alt="Sand cat emoji" class="sandcat2" /></p>
			</div>
		</section>

		<section class="categories">
			<div class="category projects">
				<h2>Projects</h2>
				<hr />
				<ul class="projects-list">
					{#each projects as project, i}
						<li class:project-hidden-by-default={i >= 5}>
							<span class="project-date">
								{project.startYear} - {project.endYear ?? 'now'}
							</span> <a href={project.href ?? project.source}>{project.name}</a>
							- {project.description}
						</li>
					{/each}
				</ul>
				<label class="show-more-container">
					<input class="show-more" type="checkbox" autocomplete="off" />
					Show more
				</label>
			</div>
			<div class="category links">
				<h2>Links</h2>
				<hr />
				<p>
					My blog is below. <a href="#blog">Scroll down</a>!
				</p>
				<p>
					Most of my code is on my GitHub at
					<a href="https://github.com/mat-1" class="nowrap">
						<span class="link-icon"><GitHubIcon></GitHubIcon></span>github.com/mat-1
					</a>.
				</p>
				<p>
					You can donate to me through Ko-fi at <a
						href="https://ko-fi.com/matdoesdev"
						class="nowrap"
					>
						<span class="link-icon smaller-icon"><KofiIcon></KofiIcon></span>ko-fi.com/matdoesdev
					</a>. &lt;3
				</p>
				<p>
					If you'd like, you can also browse this site through Tor at <a
						href="http://matctazmu565vivubva3p3bulaneangiff47xmnezzjx2nuinwjoxjyd.onion"
						class="text-break-anywhere"
					>
						<span class="link-icon tor-icon"><TorIcon></TorIcon></span
						>matctazmu565vivubva3p3bulaneangiff47xmnezzjx2nuinwjoxjyd.onion
					</a>
					or I2P at
					<a
						href="http://mat.i2p/?i2paddresshelper=Xq~DdXunHjMeNNevnN8Kc~rzeI5AtXfq0P0W3FsqQw5u4LMzXQWa4Xff-mqeD1NndPd0AjxIYLoPC-wSlROUfvEmXuhaiz9yyVvhqOGmUJ2YwGHOJ4iH~3JzUqgkJyMXGZh89uUG5S50WjDOUheo2n~EGGdU3fRD5osMxz~VJGqGTKbjKPhkZn5nwxbUOUE~VCxskkDZq~MpIIJo1ECwJCuUC~r4RTeVvoba7qvFOpOlIsu-aj299wcLrKaBdrKKwr1JgmPRjHCNJGvp69k4vfvKJVgEWNxsfFKZq3uUn1hlglAH4SvyWGeJFdD-hcXz-LiJvvOcW5~iczBZfdGvzxPe051QIHgFhuBiT~FRKcNaV~KqrN-Hj6a3juFjOW-sE97TnVAgeAWG4GJP8VEpw1pX8qqs34ePpreO4WM5b6y~Gb-iUCB4BYbgYk~xUSnDWlfyqqzfh4-mt47hYzlvrEAnOaT6sp8kK-Umnt-wa4vbmjgh9VeiegN2mqdC4vzFBQAEAAcAAA=="
						>mat.i2p</a
					>.
				</p>
				<p class="mystery-link-container" bind:this={mysteryLinkContainerEl}>
					Mysterious link: <a href={mysteryLink} rel="external">???</a> (I forgot what this one does).
				</p>
			</div>

			<div class="category contact">
				<h2>Contact</h2>
				<hr />
				<p>
					<span>If possible, I prefer that you contact me through email at</span>
					<a href="mailto:mat@matdoes.dev" class="nowrap">
						<span class="link-icon"><EnvelopeIcon></EnvelopeIcon></span>mat@matdoes.dev
					</a>.
					<span>I appreciate emails encrypted with my</span>
					<a href="/mat.asc" rel="external" class="nowrap">
						<span class="link-icon"><KeyIcon></KeyIcon></span>PGP key</a
					><span>! Note that I may be slow to respond at times.</span>
				</p>
				<p>
					<span>For instant messaging, my Matrix is</span>
					<a href="https://matrix.to/#/@mat:matdoes.dev" class="nowrap">
						<span class="link-icon matrix-icon"><MatrixIcon></MatrixIcon></span>@mat:matdoes.dev</a
					><span>.</span>
				</p>
				<p>
					For public messages, you can mention me on the fediverse at
					<a href="https://f.matdoes.dev/mat" class="nowrap">
						<span class="link-icon fediverse-icon"><Fediverse></Fediverse></span>@mat@matdoes.dev
					</a>.
				</p>
			</div>
		</section>

		<section id="buttons">
			<div
				class="oneko"
				aria-hidden="true"
				style="background-image: url(/retro/oneko.gif)"
				bind:this={nekoEl}
			></div>

			<h2>Buttons <span class="colon3">:3</span></h2>

			<hr />
			<div class="buttons-container">
				<Buttons></Buttons>
			</div>
		</section>

		<section id="blog">
			<h2>Blog</h2>
			<hr />
			{#each posts as post}
				<PostPreview {post} />
			{/each}
		</section>

		<section>
			<img src="//counter.matdoes.dev" alt="visitor counter" id="counter" />
		</section>
	</div>
</main>

<style>
	main {
		/* override its width just for this page */
		width: 80em;
	}

	:global(#page) {
		width: 100%;
		perspective: 1px;
		perspective-origin: top;
		overflow-x: hidden;
	}
	:global(body:not(.sandcat-mode)) #index-background {
		background-image: url('$lib/assets/hilbert-curve.png');
		image-rendering: pixelated;
		background-size: 100%;
		background-repeat: repeat;
		position: absolute;
		width: 100%;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: -1000;
		opacity: 10%;
		user-select: none;

		transform: translateZ(-1px) scale(2) translateY(25%);
	}
	@media only screen and (max-width: 500px) {
		:global(body:not(.sandcat-mode)) #index-background {
			opacity: 15%;
		}
	}

	.page-description {
		margin-top: 1em;
	}

	.section-container {
		margin: 0 auto;
	}
	section {
		width: fit-content;
		margin: 0 auto;
		margin-bottom: 2rem;
	}

	#main-title-cover {
		touch-action: none;
		opacity: 0;
		pointer-events: none;
	}
	#main-title {
		position: absolute;
		right: 0;
		left: 0;
		align-content: center;
	}
	#main-title-effect-container {
		display: flex;
		gap: 4px;
		align-items: center;
	}
	#main-title-container {
		width: 100%;
		height: 100%;
		position: relative;
	}
	h1,
	#main-title-cover {
		background: linear-gradient(0deg, #aaa, #fff);
		/* fallback */
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		filter: drop-shadow(2px 2px #333);
		text-align: center;
		font-family: 'Comic Sans MS', cursive !important;
		font-size: 32px;
		font-weight: 700;
		margin: 0;
	}

	@media only screen and (max-width: 430px) {
		.sparkles {
			width: 4em;
			height: 4em;
		}
	}

	p {
		margin: 0.25em;
	}
	h2 {
		text-align: center;
		margin-bottom: 0;
	}
	hr {
		margin-top: 0.1em;
	}

	#buttons {
		margin-top: 4rem;
		position: relative;
	}
	.oneko {
		right: 2.5rem;
		top: 0.45em;
	}

	.buttons-container {
		max-width: calc(100vw - 32px);
	}

	#blog {
		max-width: 50rem;
		margin-top: 4rem;
	}
	#blog h2 {
		font-size: 2rem;
		padding-top: 1rem;
	}
	#blog hr {
		margin-top: 0;
	}

	.category {
		max-width: 24rem;
		flex: 1;
	}
	.categories {
		display: flex;
		gap: 1rem;
		padding: 0 0.5rem;
	}
	@media only screen and (max-width: 800px) {
		.categories {
			flex-direction: column;
		}
		.category {
			max-width: 35rem;
		}
	}

	.projects-list {
		margin: 0;
		padding: 0;
		list-style-type: none;
	}
	.show-more-container {
		display: block;
		cursor: pointer;
		width: fit-content;
		text-decoration: underline;
		color: var(--accent-color);
		opacity: 0.9;
		padding: 0.25rem 2em 0 0;
	}
	.show-more {
		display: none;
	}
	.projects:not(:has(.show-more:checked)) .projects-list {
		mask-image: linear-gradient(#000d 50%, #0002 100%);
	}

	.projects:not(:has(.show-more:checked)) .project-hidden-by-default {
		display: none;
	}
	.projects:has(.show-more:checked) .show-more-container {
		display: none;
	}

	.project-date {
		color: var(--text-color-alt-3);
		font-style: italic;
		margin-right: 0.2em;
	}

	.category > p {
		margin: 0 0 0.75em 0;
	}

	#buttons h2 {
		position: relative;
		width: fit-content;
		margin: 0 auto;
	}
	.colon3 {
		font-family: 'Atkinson Hyperlegible';
		color: var(--background-color-alt);
		top: 0.05em;
		margin-left: 0.3em;
		position: absolute;
	}

	.mystery-link-container {
		display: none;
	}

	.nowrap {
		white-space: nowrap;
	}

	.link-icon {
		/* fill: var(--text-color); */
		top: 0.25em;
		margin-right: 0.125em;
		position: relative;
		display: inline-block;
		height: 1em;
		/* display: none; */
		/* height: 1em; */
	}
	.smaller-icon {
		font-size: 0.9em;
		margin-right: 0.25em;
	}
	.matrix-icon {
		font-size: 0.9em;
		margin-right: 0.25em;
		top: 0.2em;
	}
	.fediverse-icon {
		top: 0.1em;
	}
	.tor-icon {
		font-size: 0.7em;
		margin-right: 0.25em;
		top: 0.15em;
	}

	.sandcat2 {
		height: 1em;
		vertical-align: text-top;
	}

	.text-break-anywhere {
		word-break: break-all;
	}
</style>
