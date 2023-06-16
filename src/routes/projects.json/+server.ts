import projects from '../_projects.json'
import { json, type RequestHandler } from '@sveltejs/kit'

export const prerender = true

export const GET: RequestHandler = async () => {
	return json(projects)
}
