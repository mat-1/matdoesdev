import { marked } from 'marked'

// const renderer: Partial<marked.Renderer> = {
// 	image(href: string, title: string, text: string) {
// 		href = cleanUrl(this.options.sanitize, this.options.baseUrl, href)
// 		if (href === null) {
// 			return text
// 		}
// 		let out = `<img src="${href}" alt="${text}"`
// 		if (title)
// 			out += ` title="${title}"`
// 		out += this.options.xhtml ? '/>' : '>'
// 		return out
// 	},
// }

// marked.use({ renderer })

export function markdownToHtml(md: string, baseUrl?: string): string {
	return marked.parse(md, { baseUrl })
}
