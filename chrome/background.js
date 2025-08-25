chrome.runtime.onInstalled.addListener(async () => {
    const salario = await chrome.storage.sync.get(["salario"]).then((res) =>
        res.salario
    ) || (120000 / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

  chrome.storage.sync.set({ salario });
});
