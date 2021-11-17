import { marked } from 'marked'

// marked.use({

// })

export function markdownToHtml(md: string): string {
	return marked.parse(md)
}
