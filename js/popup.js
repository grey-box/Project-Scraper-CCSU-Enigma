let urlform = document.getElementById('url-form')
let optform = document.getElementById('option-form')

document.addEventListener('DOMContentLoaded', () => {
	chrome.storage.local.get({
		aszip: false,
		corsbypass: false,
	}, (data) => {
		optform.corsbypass.checked = data.corsbypass
		optform.aszip.checked = data.aszip
	})
})

optform.corsbypass.addEventListener('change', (event) => {
	chrome.storage.local.set({ corsbypass: Boolean(event.target.checked) })
})

optform.aszip.addEventListener('change', (event) => {
	chrome.storage.local.set({ aszip: Boolean(event.target.checked) })
})

urlform.addEventListener('submit', (event) => {
	let url = urlform.url.value

	chrome.downloads.download({
		url: url,
	}).catch(err => console.error("no url specified"))

	event.preventDefault()
})
