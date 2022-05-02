

chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    console.log(tabs[0].url);
    const urlForm = document.getElementById('urlFormInput');
    urlForm.value = tabs[0].url;
});

document.addEventListener('DOMContentLoaded', popupFunction);

function popupFunction() {
    // Adds a listener to the Begin Crawl button so the user can begin crawling when he/she is ready to
    document.getElementById("crawlBtn").addEventListener("click", beginCrawl);

    // Allows for user to begin downloading. Since this feature is not implemented yet,
    // the download button is disabled on popup.html
    // document.getElementById('submitBtn').addEventListener('click', saveAs);
}

function beginCrawl() {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        const crawlParameters = ["", "", "", ""];
        crawlParameters[0] = document.getElementById('urlFormInput').value;
        crawlParameters[1] = document.getElementById('depthFormInput').value;
        crawlParameters[2] = document.getElementById('inlineFormCheck').value;
        crawlParameters[3] = "beginCrawl";
        chrome.tabs.sendMessage(tabs[0].id, crawlParameters);
    });
}

chrome.runtime.onMessage.addListener((msg, sender, response) => {
    console.log("Message Received");
    console.log(msg);
    if (msg.crawlerData[0] === "crawler" && msg.crawlerData[1] === "crawledList") {
        console.log("Reached");
        let crawlerString = msg.crawlerData[2].join("\n");
        let crawlerFile = new File([crawlerString], "test.txt", {
              type: "text/plain",
        });

        let url = URL.createObjectURL(crawlerFile);

        chrome.downloads.download({
              url: url,
              filename: "crawledURLs",
              saveAs: true
        });
    }
});

// Right now this just saves a text file to the computer to test downloading with Chrome Extension
// no longer works
/*function saveAs() {
    let file = new File(["test"], "test.txt", {
      type: "text/plain",
    });
    let url = URL.createObjectURL(file);
    const urlForm = document.getElementById('urlFormInput');
    let name = urlForm.value;
    chrome.downloads.download({
      url: url,
      filename: "replacewithname", // not working with name variable
      saveAs: true
    });
}*/


