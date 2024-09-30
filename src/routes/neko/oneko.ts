// based on code written by adryd, ty <3
// https://github.com/adryd325/oneko.js/blob/main/oneko.js

import { browser } from '$app/environment'
import { writable } from 'svelte/store'

let followerNekoCount = 0
export let loadedNekoCount = writable(0)

export const BASE_SPRITESHEET_URL = '/retro/oneko.gif'

// this gets updated later (from localStorage)
let nekoConfig = {
	accelMultiplier: 10,
	slipperiness: 0,

	persistOnReload: false,
	// we only store initialized nekos here
	// (so we don't store the idle one on /retro unless it's clicked)
	nekoStates: [] as NekoState[],
	// this is a writable since we need to be able to listen to changes without polling
	spritesheetUrls: writable([BASE_SPRITESHEET_URL]),
}

export interface NekoState {
	index: number
	/**
	 * An index into spritesheetSources. Defaults to 0 if out of bounds.
	 */
	spritesheetIndex: number

	x: number
	y: number

	velX: number
	velY: number

	mouseX: number
	mouseY: number

	frameCount: number
	idleTime: number
	idleAnimation: string | null
	idleAnimationFrame: number

	// nekos have their speed slightly randomized so it looks better when
	// there's many of them
	speedMultiplier: number
}

// this gets updated later
let exactMousePosX: number | undefined = undefined
let exactMousePosY: number | undefined = undefined

const FRAMES_PER_SECOND = 10

const SPRITE_SETS = {
	idle: [[-3, -3]],
	alert: [[-7, -3]],
	scratchSelf: [
		[-5, 0],
		[-6, 0],
		[-7, 0],
	],
	scratchWallN: [
		[0, 0],
		[0, -1],
	],
	scratchWallS: [
		[-7, -1],
		[-6, -2],
	],
	scratchWallE: [
		[-2, -2],
		[-2, -3],
	],
	scratchWallW: [
		[-4, 0],
		[-4, -1],
	],
	tired: [[-3, -2]],
	sleeping: [
		[-2, 0],
		[-2, -1],
	],
	N: [
		[-1, -2],
		[-1, -3],
	],
	NE: [
		[0, -2],
		[0, -3],
	],
	E: [
		[-3, 0],
		[-3, -1],
	],
	SE: [
		[-5, -1],
		[-5, -2],
	],
	S: [
		[-6, -3],
		[-7, -2],
	],
	SW: [
		[-5, -3],
		[-6, -1],
	],
	W: [
		[-4, -2],
		[-4, -3],
	],
	NW: [
		[-1, 0],
		[-1, -1],
	],
}

export function initNeko(
	givenNekoEl: HTMLDivElement | undefined = undefined,
	updateSpriteCallback: ((name: string) => void) | undefined = undefined,
	state: NekoState | undefined = undefined
) {
	loadedNekoCount.update((value) => value + 1)

	let nekoEl: HTMLDivElement
	if (givenNekoEl) {
		nekoEl = givenNekoEl
	} else {
		nekoEl = document.createElement('div')
		// background-image: url(/retro/oneko.gif)
		nekoEl.classList.add('oneko')

		// set our position randomly to an edge on the page
		let edge = Math.floor(Math.random() * 4)

		let nekoX = 0
		let nekoY = 0

		if (state) {
			nekoX = state.x - 16
			nekoY = state.y - 16
		} else {
			switch (edge) {
				case 0:
					nekoX = 0
					nekoY = Math.random() * window.innerHeight
					break
				case 1:
					nekoX = Math.random() * window.innerWidth
					nekoY = 0
					break
				case 2:
					nekoX = window.innerWidth
					nekoY = Math.random() * window.innerHeight
					break
				case 3:
					nekoX = Math.random() * window.innerWidth
					nekoY = window.innerHeight
					break
			}
		}

		document.body.appendChild(nekoEl)

		nekoEl.style.left = `${window.scrollX + nekoX}px`
		nekoEl.style.top = `${window.scrollY + nekoY}px`
	}
	nekoEl.style.backgroundImage = 'url("/retro/oneko.gif")'

	// by default, don't move until the mouse is moved
	const xFromElement = nekoEl.offsetLeft + 16
	const yFromElement = nekoEl.offsetTop + 16

	const nekoState: NekoState = {
		index: nekoConfig.nekoStates.length,
		spritesheetIndex: 0,
		// set our pos based on where the element is on the page
		x: state?.x ?? xFromElement,
		y: state?.y ?? yFromElement,

		velX: state?.velX ?? 0,
		velY: state?.velY ?? 0,

		mouseX: state?.mouseX ?? xFromElement,
		mouseY: state?.mouseY ?? yFromElement,

		frameCount: state?.frameCount ?? 0,
		idleTime: state?.idleTime ?? 0,
		idleAnimation: state?.idleAnimation ?? null,
		idleAnimationFrame: state?.idleAnimationFrame ?? 0,

		speedMultiplier: state?.speedMultiplier ?? 1,
	}

	const startedAt = Date.now()

	let followingMouse = false
	async function startFollowingMouse() {
		// make sure the function doesn't get run multiple times
		if (followingMouse) return
		followingMouse = true

		// make sure we've waited at least 100ms since the neko was created.
		// this is partially to fix a bug where the position is detected as 0,0
		await new Promise((resolve) => setTimeout(resolve, startedAt + 100 - Date.now()))

		followerNekoCount += 1
		nekoState.index = nekoConfig.nekoStates.length
		// set the neko's speed, if necessary
		if (nekoState.index > 0 && nekoState.speedMultiplier === 1) {
			// random between 0.75 and 1.25
			nekoState.speedMultiplier = Math.random() * 0.5 + 0.75
		}

		nekoConfig.nekoStates.push(nekoState)

		let randomMouseOffsetDirection = Math.random() * Math.PI * 2
		// arbitrary, felt like a good enough value
		let randomMouseOffsetDistance = Math.log(followerNekoCount) * 10
		let randomMouseOffsetX = Math.cos(randomMouseOffsetDirection) * randomMouseOffsetDistance
		let randomMouseOffsetY = Math.sin(randomMouseOffsetDirection) * randomMouseOffsetDistance

		nekoState.x = nekoEl.offsetLeft - window.scrollX + 16
		nekoState.y = nekoEl.offsetTop - window.scrollY + 16

		function clampMousePos() {
			// fix the position and velocity in case it hits a wall
			if (nekoState.mouseX < 0) {
				nekoState.mouseX = 0
			} else if (nekoState.mouseX > window.innerWidth) {
				nekoState.mouseX = window.innerWidth
			}
			if (nekoState.mouseY < 0) {
				nekoState.mouseY = 0
			} else if (nekoState.mouseY > window.innerHeight) {
				nekoState.mouseY = window.innerHeight
			}
		}

		function setMousePos(x: number, y: number) {
			nekoState.mouseX = x + randomMouseOffsetX
			nekoState.mouseY = y + randomMouseOffsetY
			clampMousePos()
		}

		if (exactMousePosX !== undefined && exactMousePosY !== undefined)
			setMousePos(exactMousePosX, exactMousePosY)

		nekoEl.style.position = 'fixed'
		nekoEl.style.pointerEvents = 'none'
		nekoEl.style.left = `${nekoState.x - 16}px`
		nekoEl.style.top = `${nekoState.y - 16}px`
		nekoEl.style.zIndex = Number.MAX_VALUE.toString()

		document.addEventListener('mousemove', function (ev) {
			setMousePos(ev.clientX, ev.clientY)
		})
		// mobile support
		document.addEventListener('touchmove', function (ev) {
			setMousePos(ev.touches[0].clientX, ev.touches[0].clientY)
		})

		// move to body so it persists on page changes
		document.body.appendChild(nekoEl)
	}

	function init() {
		requestAnimationFrame(animationFrameLoop)
	}

	let lastFrameTimestamp: undefined | number

	function animationFrameLoop(timestamp: number) {
		// Stops execution if the neko element is removed from DOM
		if (!nekoEl.isConnected) {
			return
		}
		if (!lastFrameTimestamp) {
			lastFrameTimestamp = timestamp
		}
		const msPerFrame = 1000 / FRAMES_PER_SECOND
		if (timestamp - lastFrameTimestamp > msPerFrame) {
			lastFrameTimestamp = timestamp
			frame()
		}
		requestAnimationFrame(animationFrameLoop)
	}

	function setSprite(name: keyof typeof SPRITE_SETS, frame: number) {
		const sprite = SPRITE_SETS[name][frame % SPRITE_SETS[name].length]
		nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`

		updateSpriteCallback?.(name)
	}

	function resetIdleAnimation() {
		nekoState.idleAnimation = null
		nekoState.idleAnimationFrame = 0
	}

	function idle() {
		nekoState.idleTime += 1

		// every ~20 seconds
		if (
			nekoState.idleTime > 10 &&
			Math.floor(Math.random() * 200) == 0 &&
			nekoState.idleAnimation == null
		) {
			let avalibleIdleAnimations = ['sleeping', 'scratchSelf']
			if (nekoState.x < 32) {
				avalibleIdleAnimations.push('scratchWallW')
			}
			if (nekoState.y < 32) {
				avalibleIdleAnimations.push('scratchWallN')
			}
			if (nekoState.x > window.innerWidth - 32) {
				avalibleIdleAnimations.push('scratchWallE')
			}
			if (nekoState.y > window.innerHeight - 32) {
				avalibleIdleAnimations.push('scratchWallS')
			}
			nekoState.idleAnimation =
				avalibleIdleAnimations[Math.floor(Math.random() * avalibleIdleAnimations.length)]
		}

		switch (nekoState.idleAnimation) {
			case 'sleeping':
				if (nekoState.idleAnimationFrame < 8) {
					setSprite('tired', 0)
					break
				}
				setSprite('sleeping', Math.floor(nekoState.idleAnimationFrame / 4))
				if (nekoState.idleAnimationFrame > 192) {
					resetIdleAnimation()
				}
				break
			case 'scratchWallN':
			case 'scratchWallS':
			case 'scratchWallE':
			case 'scratchWallW':
			case 'scratchSelf':
				setSprite(nekoState.idleAnimation, nekoState.idleAnimationFrame)
				if (nekoState.idleAnimationFrame > 9) {
					resetIdleAnimation()
				}
				break
			default:
				setSprite('idle', 0)
				return
		}
		nekoState.idleAnimationFrame += 1
	}

	// between 32 and 64
	// helps when there's a lot of nekos
	let nekoFollowDistance = followerNekoCount === 0 ? 48 : Math.random() * 32 + 32

	function frame() {
		nekoState.frameCount += 1
		const diffX = nekoState.x - nekoState.mouseX
		const diffY = nekoState.y - nekoState.mouseY

		const distance = Math.sqrt(diffX ** 2 + diffY ** 2)
		const speed = Math.sqrt(nekoState.velX ** 2 + nekoState.velY ** 2)

		const calculatedFollowDistance = Math.max(
			nekoState.speedMultiplier * nekoConfig.accelMultiplier,
			nekoFollowDistance
		)

		if (
			distance < calculatedFollowDistance &&
			speed <= nekoState.speedMultiplier * nekoConfig.accelMultiplier * 2
		) {
			nekoState.velX = 0
			nekoState.velY = 0
			idle()
			return
		}

		nekoState.idleAnimation = null
		nekoState.idleAnimationFrame = 0

		if (nekoState.idleTime > 1) {
			setSprite('alert', 0)
			// count down after being alerted before moving
			nekoState.idleTime = Math.min(nekoState.idleTime, 7)
			nekoState.idleTime -= 1
			return
		}

		// idea for slipperiness yoinked from goldenstack
		// https://github.com/GoldenStack/icey-oneko
		// meow :3

		let accelX = diffX / distance
		let accelY = diffY / distance

		nekoState.velX *= nekoConfig.slipperiness
		nekoState.velY *= nekoConfig.slipperiness

		if (distance > calculatedFollowDistance || Math.sign(accelX) != Math.sign(nekoState.velX))
			nekoState.velX += accelX * nekoConfig.accelMultiplier
		if (distance > calculatedFollowDistance || Math.sign(accelY) != Math.sign(nekoState.velY))
			nekoState.velY += accelY * nekoConfig.accelMultiplier

		let direction: string

		direction = accelY > 0.5 ? 'N' : ''
		direction += accelY < -0.5 ? 'S' : ''
		direction += accelX > 0.5 ? 'W' : ''
		direction += accelX < -0.5 ? 'E' : ''

		if (direction !== '') setSprite(direction as any, nekoState.frameCount)

		nekoState.x -= nekoState.velX * nekoState.speedMultiplier
		nekoState.y -= nekoState.velY * nekoState.speedMultiplier

		const maxX = window.innerWidth - 16
		const maxY = window.innerHeight - 16
		if (nekoState.x < 16) {
			nekoState.x = 16
			nekoState.velX = 0
		} else if (nekoState.x > maxX) {
			nekoState.x = maxX
			nekoState.velX = 0
		}
		if (nekoState.y < 16) {
			nekoState.y = 16
			nekoState.velY = 0
		} else if (nekoState.y > maxY) {
			nekoState.y = maxY
			nekoState.velY = 0
		}

		nekoEl.style.left = `${nekoState.x - 16}px`
		nekoEl.style.top = `${nekoState.y - 16}px`
	}

	init()

	if (state) startFollowingMouse()
	return startFollowingMouse
}

export const LOCALSTORAGE_NAMES = {
	// this one is also hardcoded in other places since it's used to detect
	// whether the script should run
	persistOnReload: 'neko-persist',

	nekoStates: 'neko-states',
	accelMultiplier: 'neko-accel',
	slipperiness: 'neko-slipperiness',
}

declare global {
	interface Window {
		nekosLoaded: boolean | undefined
	}
}

export let pageRendered = writable(false)

if (browser) {
	document.addEventListener('mousemove', function (ev) {
		exactMousePosX = ev.clientX
		exactMousePosY = ev.clientY
	})
	document.addEventListener('touchmove', function (ev) {
		exactMousePosX = ev.touches[0].clientX
		exactMousePosY = ev.touches[0].clientY
	})

	// persist on reload
	const nekoPersist = localStorage.getItem(LOCALSTORAGE_NAMES.persistOnReload) === 'true'
	if (nekoPersist) nekoConfig.persistOnReload = nekoPersist

	// create any nekos if necessary
	const nekoStates = nekoPersist ? localStorage.getItem(LOCALSTORAGE_NAMES.nekoStates) : '[]'
	if (nekoStates) {
		const nekoStatesJson = JSON.parse(nekoStates)

		async function spawnNekos() {
			for (const state of nekoStatesJson) {
				console.log('creating neko', state)
				initNeko(undefined, undefined, state)
			}

			// wait a few hundred ms before we start saving just to make sure we don't write an empty list
			await new Promise((resolve) => setTimeout(resolve, 500))

			setInterval(() => {
				// update localstorage
				localStorage.setItem(LOCALSTORAGE_NAMES.nekoStates, JSON.stringify(nekoConfig.nekoStates))
			}, 100)
		}

		// this is just to make sure we don't spawn the nekos multiple times if
		// the script gets reloaded
		if (window.nekosLoaded === undefined) {
			window.nekosLoaded = true
			// we can't spawn the nekos immediately since it could happen before
			// svelte hydrates the page (and then our nekos get deleted)
			const pageRenderedUnsubscribe = pageRendered.subscribe((value) => {
				if (value) {
					// also now wait for the page to be loaded if it's not already
					spawnNekos()
					pageRenderedUnsubscribe()
				}
			})
		}
	}

	// accel multiplier
	const accelMultiplier = localStorage.getItem(LOCALSTORAGE_NAMES.accelMultiplier)
	if (accelMultiplier) nekoConfig.accelMultiplier = JSON.parse(accelMultiplier)

	// slipperiness
	const slipperiness = localStorage.getItem(LOCALSTORAGE_NAMES.slipperiness)
	if (slipperiness) nekoConfig.slipperiness = JSON.parse(slipperiness)
}

export { nekoConfig }
