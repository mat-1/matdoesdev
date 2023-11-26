import { sveltekit } from '@sveltejs/kit/vite'

export default {
	plugins: [sveltekit()],

	build: {
		target: 'es2020',
	},
}
