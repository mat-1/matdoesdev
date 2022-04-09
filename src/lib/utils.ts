import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
	html: true,
	breaks: true,
})

export function markdownToHtml(original: string, baseUrl?: string): string {
	return md.render(original)
}

// https://nodejs.org/api/url.html#urlresolvefrom-to
function resolveUrl(from: string, to: string): string {
	const resolvedUrl = new URL(to, new URL(from, 'resolve://'))
	if (resolvedUrl.protocol === 'resolve:') {
		// `from` is a relative URL.
		const { pathname, search, hash } = resolvedUrl
		return pathname + search + hash
	}
	return resolvedUrl.toString()
}
