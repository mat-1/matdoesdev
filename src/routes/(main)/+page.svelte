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
			if (!titleEl) return
			titleEl.textContent = titleContent.slice(0, i + 1)
			await new Promise((r) => setTimeout(r, delays[i]))
		}
	})

	const defaultSentence1 = "I'm mat, I do full-stack software development."
	const defaultSentence2 =
		"This portfolio contains my blog posts and links to some of the projects I've made."

	let titleClickCount = 0
	let titleEditable = false
	function onTitleClicked() {
		titleClickCount++
		if (titleClickCount >= 5) {
			titleEditable = true
		}
	}
	let sentence1 = defaultSentence1
	let sentence2 = defaultSentence2
	let defaultCopyrightText: string | undefined = undefined

	async function startSandcatMode() {
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

		copyrightEl.textContent = copyrightText
	}
</script>

<svelte:head>
	<link rel="alternate" type="application/rss+xml" title="RSS" href="/blog.rss" />
	<link rel="alternate" type="application/atom+xml" title="Atom" href="/blog.atom" />
</svelte:head>

<Head />

<div class="section-container">
	<section id="main-index-page-section">
		<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
		<h1
			bind:this={titleEl}
			id="main-title"
			on:click={onTitleClicked}
			contenteditable={titleEditable}
			on:input={onTitleEdited}
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
