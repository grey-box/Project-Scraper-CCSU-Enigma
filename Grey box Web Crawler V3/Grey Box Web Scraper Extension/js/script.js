/*
document.getElementById("submitBtn").addEventListener("click", saveAs);

saveAs() {
    let file = new File();
    let url = URL.createObjectURL(file);
    chrome.downloads.download({
      url: url,
      filename: urFormInput,
      saveAs: true;
    });
}*/

chrome.runtime.sendMessage(
    {
        contentScriptQuery: "postData"
       // , data: JSONdata
        //, url: ApiUrl
    }, function (response) {
        debugger;
        if (response != undefined && response != "") {
            callback(response);
        }
        else {
            debugger;
            callback(null);
        }
    });