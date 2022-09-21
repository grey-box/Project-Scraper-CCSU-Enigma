

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
    //the download button is disabled on popup.html
    document.getElementById('submitBtn').addEventListener('click', saveAs);
    //saves only the submit button
}

function beginCrawl() {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        const crawlParameters = ["", "", "", ""];
        crawlParameters[0] = document.getElementById('urlFormInput').value;
        crawlParameters[1] = document.getElementById('depthFormInput').value;
        crawlParameters[2] = document.getElementById('aszip').value;
        crawlParameters[3] = "beginCrawl";
        document.getElementById("currentProgress").innerText=document.getElementById('aszip').value;
        chrome.tabs.sendMessage(tabs[0].id, crawlParameters);
    });
}

chrome.runtime.onMessage.addListener((msg, sender, response) => {
    //this is where the scraper code will return
    if (msg.crawlerData[0] === "crawler" && msg.crawlerData[1] === "crawledList") { 
        document.getElementById("currentProgress").innerText= "Download Ready";
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
chrome.runtime.onMessage.addListener((msg, sender, response) => {
    if(msg.progress[0]=="progress")
    {
        document.getElementById("progress-bar").style="width:"+(msg.progress[1]/msg.progress[2]*100)+"%;";
        document.getElementById("progress-bar").ariaValueNow=msg.progress[1]/msg.progress[2]*100;
        //style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"
        if(msg.progress[1]-1==msg.progress[2])
        {
            document.getElementById("currentProgress").innerText= "Filtering URLS";
        }
    }
});
function saveAs(){
    let url = form.url.value;
    /*fetch(url) TESTING OTHER CODE, DO NOT DELETE
    .then(function (response) {
        switch (response.status) {
            // status "OK"
            case 200:
                return response.text();
            // status "Not Found"
            case 404:
                throw response;
        }
    })
    .then(function (template) {
        document.getElementById("currentProgress").innerText= "found";
    })
    .catch(function (response) {
        // "Not Found"
        document.getElementById("currentProgress").innerText= "not found";
    });*/
	chrome.downloads.download({
		url: url,
        saveAs:true
	}).catch(err => console.error("no url specified"))
}
