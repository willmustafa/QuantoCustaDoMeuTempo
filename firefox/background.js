browser.runtime.onInstalled.addListener(() => {
  browser.storage.sync.set({salario: '1200'});
});

browser.storage.sync.get(['salario']).then(res => {console.log(res.salario)})