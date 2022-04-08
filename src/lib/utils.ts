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

	const centered: marked.TokenizerExtension = {
		name: 'centered',
		level: 'block',
		start(src: string) {
			// the marked typings want a `number` and we're returning a `number | undefined` so we have to do this :(
			return src.match(/\|\|/)?.index as number
		},
		tokenizer(
			this: marked.TokenizerThis,
			src: string,
			tokens: marked.Token[]
		): marked.Tokens.Generic | void {
			const rule = /^\|\|(.+?)\|\|/
			const match = rule.exec(src)
			if (match) {
				const token = {
					type: 'centered',
					raw: match[0],
					text: match[1].trim(),
					tokens: [],
				}
				this.lexer.inline(token.text, token.tokens)
				return token
			}
		},
		// @ts-expect-error Marked doesn't include `renderer` in the typings.
		renderer(this: marked.TokenizerThis, token: marked.Tokens): string | false {
			// @ts-expect-error Property 'parser' does not exist on type 'TokenizerThis'.
			return `<div class="center">${this.parser.parseInline(token.tokens)}\n</div>`
		},
	}
	const left: marked.TokenizerExtension = {
		name: 'left',
		level: 'block',
		start(src: string) {
			// the marked typings want a `number` and we're returning a `number | undefined` so we have to do this :(
			return src.match(/<-\W/)?.index as number
		},
		tokenizer(
			this: marked.TokenizerThis,
			src: string,
			tokens: marked.Token[]
		): marked.Tokens.Generic | void {
			const rule = /^<-\W(.+?)\W<-/
			const match = rule.exec(src)
			if (match) {
				const token = {
					type: 'left',
					raw: match[0],
					text: match[1].trim(),
					tokens: [],
				}
				this.lexer.inline(token.text, token.tokens)
				return token
			}
		},
		// @ts-expect-error Marked doesn't include `renderer` in the typings.
		renderer(this: marked.TokenizerThis, token: marked.Tokens): string | false {
			// @ts-expect-error Property 'parser' does not exist on type 'TokenizerThis'.
			return `<div class="markdown-float-left">${this.parser.parseInline(token.tokens)}\n</div>`
		},
	}
	const right: marked.TokenizerExtension = {
		name: 'right',
		level: 'block',
		start(src: string) {
			// the marked typings want a `number` and we're returning a `number | undefined` so we have to do this :(
			return src.match(/->\W/)?.index as number
		},
		tokenizer(
			this: marked.TokenizerThis,
			src: string,
			tokens: marked.Token[]
		): marked.Tokens.Generic | void {
			const rule = /^->\W(.+?)\W->/
			const match = rule.exec(src)
			if (match) {
				const token = {
					type: 'right',
					raw: match[0],
					text: match[1].trim(),
					tokens: [],
				}
				this.lexer.inline(token.text, token.tokens)
				return token
			}
		},
		// @ts-expect-error Marked doesn't include `renderer` in the typings.
		renderer(this: marked.TokenizerThis, token: marked.Tokens): string | false {
			// @ts-expect-error Property 'parser' does not exist on type 'TokenizerThis'.
			return `<div class="markdown-float-right">${this.parser.parseInline(token.tokens)}\n</div>`
		},
	}

	marked.use({ renderer, extensions: [centered, left, right] })

	return marked.parse(md, { baseUrl, breaks: true })
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
