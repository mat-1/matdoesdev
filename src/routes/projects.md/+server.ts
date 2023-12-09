import type { RequestHandler } from '@sveltejs/kit'
import projects from '../_projects.json'

export const prerender = true

export const GET: RequestHandler = async ({ fetch }) => {
	let content = '# Projects\n\n'

	for (const project of projects) {
		if (project.href) {
			content += `- [${project.name}](${project.href})\n`
		} else {
			content += `- ${project.name}\n`
		}
	}

	return new Response(content, {
		headers: {
			'content-type': 'text/plain',
		},
	})
}
