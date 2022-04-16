let form = document.getElementById("url-form")

form.addEventListener('submit', async (event) => {
	let url = form.elements["url"]

	fetch('http://127.0.0.1:8080/' + url.value)
		.then(res => res.text())
		.then(txt => { console.log(txt) })
		.catch(e => {
			console.log(e)
		})

	await chrome.downloads.download({
		url: 'http://127.0.0.1:8080/' + url.value,
		filename: 'cors_file'
	})

	event.preventDefault()
})

