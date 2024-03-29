const siteClasses = {
  "www.google.com": {
    price: ".OFFNJ",
    putHere: ".kHxwFf",
  },
};

let currentTab = document.location.host;

window.addEventListener("load", async function () {
  if (
    currentTab == "www.google.com" &&
    document.location.href.includes("tbm=shop")
  ) {
    chrome.storage.sync.get(["salario"]).then((result) => {
      const salarioInput = result.salario;

      const valorHora = salarioInput / (8 * 5 * 4);

      const produtos = document.querySelectorAll(siteClasses[currentTab].price);
      const produtosPutHere = document.querySelectorAll(
        siteClasses[currentTab].putHere
      );

      if (!produtosPutHere) return;

      for (let i = 0; i < produtos.length - 1; i++) {
        const valorProduto = clearMoney(produtos[i].innerHTML);
        const valorFinal = Math.ceil(valorProduto / valorHora);

        let elHoras = document.createElement("p");
        elHoras.className = "button-hours";
        elHoras.innerText = `${valorFinal} horas de trabalho.`;

        if (produtosPutHere?.[i]) produtosPutHere[i].append(elHoras);
      }
    });
  }
});

function clearMoney(value) {
  return Number.parseFloat(value.replace(/\D+/g, "")) / 100;
}
