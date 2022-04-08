---
title: matdoes.dev markdown
published: 2021-03-24T05:53:14.373+00:00
---

A couple years ago when I was creating the matdoes.dev blog I wrote a somewhat powerful markdown system with Regex to allow me to more easily write blog posts. Although I've barely written any posts, I'm still proud of it. Also this post is mostly just reference for myself, lol.
I present: matdown™

---

Relative anchor: `\[matdoesdev\]\(/blog\)` [matdoesdev](/blog)

External anchor: `\[matdoesdev\]\(https://matdoes.dev\)` [matdoesdev](https://matdoes.dev)
(External anchors have target=\_blank so they open in new pages)

Normal links: `https:\/\/matdoes.dev` https://matdoes.dev

Code block: \`\`\`py
print('code')
\`\`\`

```py
print('code')
```

Inline code: `\`code\`` `code`

Block quote: `> text`

> text

Italic: \*text\* _text_
Bold: \*\*text\*\* **text**
Italic & bold: \*\*\*text\*\*\* **_text_**

Horizontal center: `\|\|text\|\|`
||text||

Titles:
\# h2
\#\# h3
\#\#\# h4
\#\#\#\# h5
\#\#\#\#\# h6
\#\#\#\#\#\# h6

# h2

## h3

### h4

#### h5

##### h6

###### h6

## Horizontal rule: \-\-\-

Image:
!\[description](https://image)

<-
Float left
<-
