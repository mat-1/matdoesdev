import yaml from 'js-yaml'
import path from 'path'
import fs from 'fs'

const postsDir = 'src/posts'

interface BlogPost {
	title: string
	body: string
	slug: string
}

/** Get a blog post by the slug, returning null if it doesn't exist */
export async function getPost(slug: string): Promise<BlogPost | null> {
	// get all the posts in the posts directory, so we can check that the user is going to a valid one
	const existingPosts: string[] = await fs.promises.readdir(postsDir)

	if (!existingPosts.includes(slug)) {
		// this post doesn't exist, give them an error
		return null
	}

	// ok the post exists, so we can safely read the md file
	const postMarkdown = await fs.promises.readFile(path.join(postsDir, slug, 'index.md'), 'utf8')

	const [ _, yamlMetadata=null, markdownContent=null ] = postMarkdown.match(/^---\n([\w\W]+?)\n---\n([\w\W]+)$/) ?? []

	if (yamlMetadata === null)
		throw new Error(`Blog post "${slug}" has no metadata.`)
	if (markdownContent === null)
		throw new Error(`Blog post "${slug}" has no content.`)

	const metadata: NonNullable<any> = yaml.load(yamlMetadata)

	// make sure the post has all the required metadata
	const requiredFields = [ 'title' ]
	for (const requiredField of requiredFields)
		if (!(requiredField in metadata))
			throw new Error(`Blog post "${slug}" is missing metadata field "${requiredField}"`)

	return {
		body: markdownContent.trim(),
		title: metadata.title,
		slug,
	}
}
