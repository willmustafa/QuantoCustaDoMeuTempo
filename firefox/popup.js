const inputSalario = document.getElementById("salario");

inputSalario.addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9,]/g, "");

  if ((this.value.match(/,/g) || []).length > 1)
    this.value = this.value.replace(/,$/, "");
});

browser.storage.sync.get(["salario"]).then((res) => {
  inputSalario.value = String(res.salario).replace(".", ",");
});

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  browser.storage.sync.set({
    salario: parseFloat(inputSalario.value.replace(",", ".")),
  });

  const x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
});
