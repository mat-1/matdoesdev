import marked from 'marked'

// marked.use({

// })

export function markdownToHtml(md: string): string {
	return marked.parse(md)
}

/** Cut off an html string at approximately a certain amount of lines */
function cutoffHtmlLines(html: string): string {}
