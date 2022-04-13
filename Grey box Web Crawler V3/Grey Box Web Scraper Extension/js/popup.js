

chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
  console.log(tabs[0].url);
  const urlForm = document.getElementById('urlFormInput');
  urlForm.value = tabs[0].url;
  /*$.get(tabs[0].url, function (result) {
       let html = result;
       let text = $(result).text();
       alert(Tested);
  });*/

});

document.addEventListener('DOMContentLoaded', downloader);

function downloader() {
    let submitBtn = document.getElementById('form');
    submitBtn.addEventListener('submit', saveAs);
}

function saveAs(){
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
}

$('#form').submit(function() {
    let urlInput = $("#urlFormInput").val();
    alert(urlInput);
    chrome.runtime.sendMessage({ run: true, data: {
            urlInput
        } });
});
