import { sveltekit } from '@sveltejs/kit/vite'
import sharp from 'sharp'
import fs from 'fs'

/** @type {import('vite').UserConfig} */
export default {
	plugins: [sveltekit(), pngToGifForRetro()],

	build: {
		target: 'es2022',
	},
}

/**
 * Convert the PNGs in the retro directory into GIFs, since some very old browsers don't support PNGs.
 * @returns {import('vite').Plugin}
 */
function pngToGifForRetro() {
	return {
		name: 'png-to-gif',
		enforce: 'post',
		apply: 'build',
		closeBundle: async () => {
			// const baseDirectory = '.svelte-kit/output/client/retro'
			const baseDirectory = 'build/retro'

			let allFiles
			try {
				allFiles = await fs.promises.readdir(baseDirectory, {
					recursive: true,
				})
			} catch {
				console.warn(`Warning: Couldn't read ${baseDirectory} so gifs weren't generated`)
				return
			}

			const files = allFiles
				.filter((file) => file.endsWith('.png'))
				.map((file) => `${baseDirectory}/${file}`)

			const handles = files.map(async (publicFilePath) => {
				const newFilePath = publicFilePath.replace(/\.png$/, '.gif')
				console.log(publicFilePath, '->', newFilePath)

				// if it already exists, skip
				if (
					await fs.promises
						.access(newFilePath, fs.constants.F_OK)
						.then(() => true)
						.catch(() => false)
				) {
					console.log(newFilePath, 'already exists, skipping')
					return
				}

				const pngBuffer = await fs.promises.readFile(publicFilePath)
				const gifBuffer = await sharp(pngBuffer).toFormat('gif').toBuffer()

				await fs.promises.writeFile(newFilePath, gifBuffer)
				console.log('wrote', newFilePath)
			})
			await Promise.all(handles)
		},
	}
}
