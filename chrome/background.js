chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({salario: '1200'});
});

chrome.storage.sync.get(['salario']).then(res => {console.log(res.salario)})