<script lang="ts">
	import Head from '$lib/Head.svelte'
	import { onMount } from 'svelte'
	import GitHubIcon from '$lib/Icon/GitHub.svelte'
	import MatrixIcon from '$lib/Icon/Matrix.svelte'
	import KofiIcon from '$lib/Icon/Kofi.svelte'
	import ButtonRow from '$lib/ButtonRow.svelte'
	import IconButtonRow from '$lib/IconButtonRow.svelte'
	import Topography from '$lib/topography.svg'

	let titleEl: HTMLParagraphElement

	onMount(async () => {
		maybeAddRandomBackground()

		const delays = [60, 63, 126, 19, 88, 95, 91, 61, 83] as const
		const titleContent = titleEl.textContent ?? ''
		titleEl.textContent = ''
		for (let i = 0; i <= titleContent.length; i++) {
			if (!titleEl) return
			titleEl.textContent = titleContent.slice(0, i + 1)
			await new Promise((r) => setTimeout(r, delays[i]))
		}
	})

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

	const defaultSentence1 = "I'm mat, I do full-stack software development."
	const defaultSentence2 =
		"This portfolio contains my blog posts and links to some of the projects I've made."

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
		titleEl.textContent = content

		const friendStylesheets: Record<string, string> = {
			adryd: 'adryd.css',
			ari: 'adryd.css',
			notnite: 'notnite.css',
			shrecknt: 'shrecknt.css',
		}

		let friendStylesheetLinkEl = document.getElementById('friend-stylesheet') as HTMLLinkElement
		if (content.toLowerCase() in friendStylesheets) {
			const stylesheetMap = friendStylesheets[content.toLowerCase()]
			if (!friendStylesheetLinkEl) {
				friendStylesheetLinkEl = document.createElement('link')
				friendStylesheetLinkEl.id = 'friend-stylesheet'
				friendStylesheetLinkEl.rel = 'stylesheet'
				document.head.appendChild(friendStylesheetLinkEl)
			}
			friendStylesheetLinkEl.href = `/friend-stylesheets/${stylesheetMap}`
		} else {
			friendStylesheetLinkEl?.remove()

			if (/^(sand|samd)?(cat|cta|car)(doesdev)?$/.test(content)) {
				sentence1 = 'meow meow, mew meow meow mrrp meow nyaa :3'
				sentence2 = 'meeeoooww ^-^ purr~ meow meow mrrp meow nya meow nyaaa meow nyaa nyaa :3'
				copyrightText = defaultCopyrightText.replace('mat', 'mta')
				startSandcatMode()
			} else if (/does/.test(content)) {
				let [name, action] = content.split('does')
				name = name.trim()
				action = action.trim()
				sentence1 = defaultSentence1.replace('mat', name)
				if (action !== 'dev') {
					sentence1 = sentence1.replace('full-stack software development', action)
				}
				sentence2 = defaultSentence2
				copyrightText = defaultCopyrightText.replace('mat', name)
			} else {
				sentence1 = defaultSentence1
				sentence2 = defaultSentence2
				copyrightText = defaultCopyrightText
			}
		}

		copyrightEl.textContent = copyrightText
	}
</script>

<svelte:head>
	<link rel="alternate" type="application/rss+xml" title="RSS" href="/blog.rss" />
	<link rel="alternate" type="application/atom+xml" title="Atom" href="/blog.atom" />
	<meta name="ICBM" content="39.0175416, -77.4659481" />
</svelte:head>

<Head />

<div class="section-container">
	<section id="main-index-page-section">
		<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
		<h1
			bind:this={titleEl}
			id="main-title"
			onclick={onTitleClicked}
			contenteditable={titleEditable}
			oninput={onTitleEdited}
			spellcheck="false"
		>
			matdoesdev
		</h1>

		<IconButtonRow>
			<a href="//github.com/mat-1"><GitHubIcon /></a>
			<a href="//matrix.to/#/@mat:matdoes.dev"><MatrixIcon /></a>
			<a href="//ko-fi.com/matdoesdev"><KofiIcon /></a>
		</IconButtonRow>

		<p>{sentence1}</p>
		<p>{sentence2}</p>
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
