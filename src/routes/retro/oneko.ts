// based on code written by adryd, ty <3
// https://github.com/adryd325/oneko.js/blob/main/oneko.js

export function initNeko(nekoEl: HTMLDivElement, updateSpriteCallback: (name: string) => void) {
	// set our pos based on where the element is on the page
	let nekoPosX = nekoEl.offsetLeft + 16
	let nekoPosY = nekoEl.offsetTop + 16

	let mousePosX = nekoEl.offsetLeft
	let mousePosY = nekoEl.offsetTop

	let frameCount = 0
	let idleTime = 0
	let idleAnimation: string | null = null
	let idleAnimationFrame = 0

	const nekoSpeed = 10
	const spriteSets = {
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

	function startFollowingMouse() {
		nekoPosX = nekoEl.offsetLeft - window.scrollX + 16
		nekoPosY = nekoEl.offsetTop - window.scrollY + 16
		mousePosX = nekoPosX
		mousePosY = nekoPosY

		nekoEl.style.position = 'fixed'
		nekoEl.style.pointerEvents = 'none'
		nekoEl.style.left = `${nekoPosX - 16}px`
		nekoEl.style.top = `${nekoPosY - 16}px`
		nekoEl.style.zIndex = Number.MAX_VALUE.toString()

		document.addEventListener('mousemove', function (event) {
			mousePosX = event.clientX
			mousePosY = event.clientY
		})

		// move to body so it persists on page changes
		document.body.appendChild(nekoEl)
	}

	function init() {
		requestAnimationFrame(onAnimationFrame)
	}

	let lastFrameTimestamp: undefined | number

	function onAnimationFrame(timestamp: number) {
		// Stops execution if the neko element is removed from DOM
		if (!nekoEl.isConnected) {
			return
		}
		if (!lastFrameTimestamp) {
			lastFrameTimestamp = timestamp
		}
		if (timestamp - lastFrameTimestamp > 100) {
			lastFrameTimestamp = timestamp
			frame()
		}
		requestAnimationFrame(onAnimationFrame)
	}

	function setSprite(name: keyof typeof spriteSets, frame: number) {
		const sprite = spriteSets[name][frame % spriteSets[name].length]
		nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`

		updateSpriteCallback(name)
	}

	function resetIdleAnimation() {
		idleAnimation = null
		idleAnimationFrame = 0
	}

	function idle() {
		idleTime += 1

		// every ~ 20 seconds
		if (idleTime > 10 && Math.floor(Math.random() * 200) == 0 && idleAnimation == null) {
			let avalibleIdleAnimations = ['sleeping', 'scratchSelf']
			if (nekoPosX < 32) {
				avalibleIdleAnimations.push('scratchWallW')
			}
			if (nekoPosY < 32) {
				avalibleIdleAnimations.push('scratchWallN')
			}
			if (nekoPosX > window.innerWidth - 32) {
				avalibleIdleAnimations.push('scratchWallE')
			}
			if (nekoPosY > window.innerHeight - 32) {
				avalibleIdleAnimations.push('scratchWallS')
			}
			idleAnimation =
				avalibleIdleAnimations[Math.floor(Math.random() * avalibleIdleAnimations.length)]
		}

		switch (idleAnimation) {
			case 'sleeping':
				if (idleAnimationFrame < 8) {
					setSprite('tired', 0)
					break
				}
				setSprite('sleeping', Math.floor(idleAnimationFrame / 4))
				if (idleAnimationFrame > 192) {
					resetIdleAnimation()
				}
				break
			case 'scratchWallN':
			case 'scratchWallS':
			case 'scratchWallE':
			case 'scratchWallW':
			case 'scratchSelf':
				setSprite(idleAnimation, idleAnimationFrame)
				if (idleAnimationFrame > 9) {
					resetIdleAnimation()
				}
				break
			default:
				setSprite('idle', 0)
				return
		}
		idleAnimationFrame += 1
	}

	function frame() {
		frameCount += 1
		const diffX = nekoPosX - mousePosX
		const diffY = nekoPosY - mousePosY
		const distance = Math.sqrt(diffX ** 2 + diffY ** 2)

		if (distance < nekoSpeed || distance < 48) {
			idle()
			return
		}

		idleAnimation = null
		idleAnimationFrame = 0

		if (idleTime > 1) {
			setSprite('alert', 0)
			// count down after being alerted before moving
			idleTime = Math.min(idleTime, 7)
			idleTime -= 1
			return
		}

		let direction: string
		direction = diffY / distance > 0.5 ? 'N' : ''
		direction += diffY / distance < -0.5 ? 'S' : ''
		direction += diffX / distance > 0.5 ? 'W' : ''
		direction += diffX / distance < -0.5 ? 'E' : ''
		setSprite(direction as any, frameCount)

		nekoPosX -= (diffX / distance) * nekoSpeed
		nekoPosY -= (diffY / distance) * nekoSpeed

		nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16)
		nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16)

		nekoEl.style.left = `${nekoPosX - 16}px`
		nekoEl.style.top = `${nekoPosY - 16}px`
	}

	init()
	return startFollowingMouse
}
