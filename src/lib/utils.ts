import { marked } from 'marked'

export function markdownToHtml(md: string, baseUrl?: string): string {
	const renderer: Partial<marked.Renderer> = {
		image(href: string, title: string, text: string) {
			// href = cleanUrl(this.options.sanitize, this.options.baseUrl, href)
			href = baseUrl ? resolveUrl(baseUrl, href) : href
			if (href === null) return text
			let out = `<img src="${href}" alt="${text}"`
			if (title) out += ` title="${title}"`
			out += '/>'
			return out
		},
	}

	marked.use({ renderer })

	return marked.parse(md, { baseUrl })
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
