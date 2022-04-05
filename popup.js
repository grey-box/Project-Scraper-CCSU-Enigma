

chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
  console.log(tabs[0].url);
  const urlForm = document.getElementById('urlFormInput');
  urlForm.value = tabs[0].url;
});