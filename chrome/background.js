chrome.runtime.onInstalled.addListener(() => {
  let salarioAtual = '1200';
  chrome.storage.sync.set({salario: salarioAtual}, function() {});
});