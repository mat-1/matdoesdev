import path from 'path'
import fs from 'fs'

const postsDir = 'src/posts'

interface BlogPost {
	title: string
	body: string
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
	const postTitleMatch = postMarkdown.match(/^# (.+)/)
	if (!postTitleMatch) {
		throw new Error(`Post "${slug}" doesn't have a title.`)
	}

	// remove the title from the content
	const postBody: string = postMarkdown.slice(postTitleMatch[0].length).trim()
	const postTitle: string = postTitleMatch[1]

	return {
		body: postBody,
		title: postTitle,
	}
}
