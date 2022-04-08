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

	const centered = {
		name: 'centered',
		level: 'block', // Is this a block-level or inline-level tokenizer?
		start(src: string) {
			return src.match(/\|\|/)?.index
		}, // Hint to Marked.js to stop and check for a match

		tokenizer(src: string, tokens: string[]) {
			const rule = /^\|\|(.*?)\|\|/
			const match = rule.exec(src)
			if (src.includes('||')) {
				console.log('src', src, match)
			}
			if (match) {
				const token = {
					// Token to generate
					type: 'centered', // Should match "name" above
					raw: match[0], // Text to consume from the source
					text: match[1].trim(), // Additional custom properties
					tokens: [], // Array where child inline tokens will be generated
				}
				this.lexer.inline(token.text, token.tokens) // Queue this data to be processed for inline tokens
				return token
			}
		},
		renderer(token) {
			return `<div class="center">${this.parser.parseInline(token.tokens)}\n</div>` // parseInline to turn child tokens into HTML
		},
	}

	marked.use({ renderer, extensions: [centered] })

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
