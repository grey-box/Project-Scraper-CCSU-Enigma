chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		"id": "bliss-web-scraper",
		"title": "Greybox Web Scraper",
		"contexts": ["page", "link"]
	})
})
