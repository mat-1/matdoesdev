let loaded = false

export function load() {
	if (loaded) return
	loaded = true

	// add an <img src="/stake-ad.png" style="position: fixed" /> to the page
	const img = document.createElement('img')
	img.src = '/stake-ad.png'
	img.style.position = 'fixed'
	img.style.bottom = '0'
	img.style.right = '0'
	img.style.zIndex = '9999'
	document.body.appendChild(img)
}
