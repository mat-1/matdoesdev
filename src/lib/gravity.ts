import { browser } from '$app/environment'
import Matter from 'matter-js'

const GRAVITY_QUERY_SELECTOR = 'p, h1, h2, .button, .icon'

export function initGravity(): () => void {
	const { Engine, Bodies, Composite, Runner, Mouse, MouseConstraint } = Matter

	console.log('gravity enabled')

	// create an engine
	const engine = Engine.create({ enableSleeping: true })

	const floorBody = Bodies.rectangle(
		window.innerWidth / 2,
		window.innerHeight + 50,
		window.innerWidth,
		100,
		{
			isStatic: true,
		}
	)
	const rightWallBody = Bodies.rectangle(
		window.innerWidth + 50,
		window.innerHeight / 2,
		100,
		window.innerHeight,
		{
			isStatic: true,
		}
	)
	const leftWallBody = Bodies.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight, {
		isStatic: true,
	})
	const ceilingBody = Bodies.rectangle(window.innerWidth / 2, -50, window.innerWidth, 100, {
		isStatic: true,
	})
	Composite.add(engine.world, [floorBody, rightWallBody, leftWallBody, ceilingBody])

	const trackedElements = new Map<HTMLElement, Matter.Body>()

	async function enableGravityOnElement(el: HTMLElement) {
		await new Promise((resolve) => requestAnimationFrame(resolve))

		let originalTextContent: string | null = null
		if (el.classList.contains('copyright') || el.id === 'main-title') {
			el.style.width = 'fit-content'
			el.style.margin = '0 auto'
			if (el.id === 'main-title') {
				originalTextContent = el.textContent
				el.textContent = 'matdoesdev'
			}
		}
		const bb = el.getBoundingClientRect()
		if (originalTextContent) el.textContent = originalTextContent

		const body = Bodies.rectangle(
			bb.left + bb.width / 2,
			bb.top + bb.height / 2,
			bb.width,
			bb.height,
			{ restitution: 1 }
		)
		el.style.position = 'absolute'
		el.style.left = bb.left + 'px'
		el.style.top = bb.top + 'px'
		el.style.width = bb.width + 'px'
		el.style.height = bb.height + 'px'
		el.style.userSelect = 'none'
		// el.style.outline = '1px solid red'

		Composite.add(engine.world, [body])
		trackedElements.set(el, body)
	}

	function makeAnchorUndraggable(el: HTMLAnchorElement) {
		// el.style.pointerEvents = 'none'
		// el.style.cursor = 'pointer'
		el.draggable = false

		// document.addEventListener('click', (e) => {
		// 	el.style.pointerEvents = ''
		// 	const clickedEl = document.elementFromPoint(e.clientX, e.clientY)
		// 	el.style.pointerEvents = 'none'
		// 	// if (clickedEl instanceof HTMLAnchorElement) {
		// 	// 	e.preventDefault()
		// 	// 	goto(clickedEl.href)
		// 	// }
		// 	if (el.contains(clickedEl)) {
		// 		e.preventDefault()
		// 		const url = new URL(el.href)
		// 		if (url.origin === window.location.origin) {
		// 			goto(el.href)
		// 		} else {
		// 			window.location.href = el.href
		// 		}
		// 	}
		// })
	}

	document.querySelectorAll(GRAVITY_QUERY_SELECTOR).forEach((el) => {
		enableGravityOnElement(el as HTMLElement)
	})
	document.querySelectorAll('a').forEach((el) => {
		makeAnchorUndraggable(el as HTMLAnchorElement)
	})

	// update positions every frame
	Matter.Events.on(engine, 'beforeUpdate', function (event) {
		trackedElements.forEach((body, el) => {
			if (body.position.y < 0) {
				// move up
				body.position.y = window.innerHeight
			}

			el.style.left = body.position.x - el.offsetWidth / 2 + 'px'
			el.style.top = body.position.y - el.offsetHeight / 2 + 'px'
			el.style.transform = `rotate(${body.angle}rad)`

			// rotate
			// el.style.transform = ''

			// const [originalWidthStyle, originalHeightStyle] = [el.style.width, el.style.height]
			// el.style.maxWidth = originalWidthStyle
			// el.style.maxHeight = originalHeightStyle
			// el.style.width = ''
			// el.style.height = ''
			// const bb = el.getBoundingClientRect()
			// el.style.transform = `rotate(${body.angle}rad)`
			// el.style.width = originalWidthStyle
			// el.style.height = originalHeightStyle
			// el.style.maxWidth = ''
			// el.style.maxHeight = ''

			// const fakeBody = Bodies.rectangle(
			// 	bb.left + bb.width / 2,
			// 	bb.top + bb.height / 2,
			// 	bb.width,
			// 	bb.height,
			// 	{
			// 		angle: body.angle,
			// 	}
			// )
			// body.vertices = fakeBody.vertices
		})
	})

	// create runner
	const runner = Runner.create()

	// run the engine
	Runner.run(runner, engine)

	// add mouse control
	var mouse = Mouse.create(document.body),
		mouseConstraint = MouseConstraint.create(engine, {
			mouse: mouse,
			constraint: {
				stiffness: 0.2,
				render: {
					visible: false,
				},
			},
		})
	Composite.add(engine.world, mouseConstraint)

	console.log('running engine')

	return () => {
		Runner.stop(runner)
	}
}
