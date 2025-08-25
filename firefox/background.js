browser.runtime.onInstalled.addListener(async () => {
    const salario = await browser.storage.sync.get(["salario"]).then((res) =>
        res.salario
    ) || (120000 / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

  browser.storage.sync.set({salario});
});