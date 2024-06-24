import projects from '../_projects.json'
import { json, type RequestHandler } from '@sveltejs/kit'

export const prerender = true

export const GET: RequestHandler = async () => {
	let content = '# Projects\n\n'

	for (const project of projects) {
		// => /minecraft-uuids 2024-02-22 - How to Make a List of Nearly Every Minecraft Player
		const nameLength = project.name.length
		const line = '='.repeat(nameLength)
		content += `${project.name}\n${line}\n${project.description}\n`
		if (project.source) {
			const languages = project.languages
			content += `=> Source ${project.source}`
			if (languages) content += ` (${languages.join(', ')})`
			content += '\n'
		}
		if (project.href && project.href != project.source) content += `=>        ${project.href}\n`

		content += '\n'
	}

	return new Response(content, {
		headers: {
			'content-type': 'text/plain; charset=utf-8',
		},
	})
}
