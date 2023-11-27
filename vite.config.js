import { sveltekit } from '@sveltejs/kit/vite'

/** @type {import('vite').UserConfig} */
export default {
	plugins: [sveltekit()],

	build: {
		target: 'es2020',
	},

	base: '',
}
