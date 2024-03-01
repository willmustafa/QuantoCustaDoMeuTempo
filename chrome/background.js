chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ salario: "1200" });
});
