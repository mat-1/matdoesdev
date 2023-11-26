import { sveltekit } from '@sveltejs/kit/vite'
import { imagetools } from 'vite-imagetools'

export default {
	plugins: [sveltekit(), imagetools()],

	build: {
		target: 'es2020',
	},
}
