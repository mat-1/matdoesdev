import { sveltekit } from '@sveltejs/kit/vite'

export default {
	plugins: [
		sveltekit(),
	],

	build: {
		target: 'es2020',
	},
	// if the user is on replit or gitpod, use a secure websocket
	// server:
	// 	process.env.REPL_ID || process.env.GITPOD_WORKSPACE_ID
	// 		? {
	// 			hmr: {
	// 				protocol: 'wss',
	// 				port: 443,
	// 			},
	// 		}
	// 		: {},

}