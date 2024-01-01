import { decode } from 'cbor-x/decode'

interface Data {
	pages: string[]
	buttons: string[]
	texts: string[]

	button_file_exts: string[]
	button_names: number[][]
	button_links: number[][]
	button_backlinks: number[][]

	links: number[][]
	link_buttons: number[][]
	link_button_alts: (number | null)[][]
	link_button_titles: (number | null)[][]

	backlinks: number[][]
	backlink_buttons: number[][]
}

const res = await fetch('https://matdoes.dev/buttons/88x31.cbor')
const buffer = await res.arrayBuffer()
export const data: Data = decode(new Uint8Array(buffer))

export function buttonUrlFromIndex(index: number) {
	const hash = buttonHashFromIndex(index)
	const ext = data.button_file_exts[index]
	return `https://matdoes.dev/buttons/i/${hash}.${ext}`
}

export function buttonUrlFromHash(hash: string) {
	return `https://matdoes.dev/buttons/i/${hash}`
}

export function buttonHashFromIndex(index: number) {
	return data.buttons[index]
}

function binarySearch<T>(arr: T[], key: T): number | null {
	let low = 0
	let high = arr.length - 1

	while (low <= high) {
		const mid = (low + high) >>> 1
		const midVal = arr[mid]

		if (midVal < key) low = mid + 1
		else if (midVal > key) high = mid - 1
		else return mid
	}

	return null
}

export function pageIndexFromName(name: string): number | null {
	return binarySearch(data.pages, name)
}

export function buttonIndexFromHash(hash: string): number | null {
	return binarySearch(data.buttons, hash)
}
