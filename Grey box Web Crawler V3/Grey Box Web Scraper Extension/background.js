

/*chrome.runtime.onMessage.addListener(function(message, sender) {
    if(!message.run) return;

    let data = message.data;
    console.log(data);
    fetch(data)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not OK');
          }
          return response.blob();
        })
        .then(myBlob => {
          myImage.src = URL.createObjectURL(myBlob);
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
        });
});*/

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.contentScriptQuery == "getdata") {
        var url = request.url;
        fetch(url)
            .then(response => response.text())
            .then(response => sendResponse(response))
            .catch()
        return true;
    }
    if (request.contentScriptQuery == "postData") {
        fetch(request.url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: 'result=' + request.data
        })
            .then(response => response.json())
            .then(response => sendResponse(response))
            .catch(error => console.log('Error:', error));
        return true;
    }
});

