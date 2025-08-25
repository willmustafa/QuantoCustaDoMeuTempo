const inputSalario = document.getElementById("salario");

inputSalario.addEventListener("input", function () {
    let value = this.value.replace(/\D/g, ""); // só dígitos
    value = (parseInt(value, 10) || 0).toString();

    this.value = (value / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",

    });
});

function getNumericValue(value) {
    let numericValue = value
        .replace(/[R$\s.]/g, "")
        .replace(",", ".");

    return parseFloat(numericValue) || 0;
}

browser.storage.sync.get(["salario"]).then((res) => {
  inputSalario.value = String(res.salario);
});

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  browser.storage.sync.set({
    salario: String(inputSalario.value),
  });

  const x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
});
