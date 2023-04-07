import projects from '../_projects.json'
import { error, json, type RequestHandler } from '@sveltejs/kit'

export const prerender = true

export const GET: RequestHandler = async ({ params }) => {
	return json(projects)
}
