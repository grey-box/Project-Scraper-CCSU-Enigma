let form = document.getElementById('url-form')

form.addEventListener('submit', async (event) => {
	let url = form.elements['url']
	let corsbypass = form.elements['corsbypass']

	if (corsbypass.value) {
		chrome.storage.sync.set({corsbypass: true})
	}

	await chrome.downloads.download({
		url: url.value,
	})

	event.preventDefault()
})

