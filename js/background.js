chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		"id": "bliss-web-scraper",
		"title": "Greybox Web Scraper",
		"contexts": ["page", "link"]
	})
})

//chrome.webRequest.onBeforeRequest.addListener((details) => {
//	let canbypass = chrome.storage.sync.get('corsbypass').then((res) => res)
//
//	if (!canbypass) {
//		return
//	}
//
//	details.requestHeaders.push({ 'X-Requested-With': '' })
//
//	return { requestHeaders: details.requestHeaders }
//}, { urls: ['<all_urls>'] }, ['extraHeaders'])
