window.onload = function () {
  const inputSalario = document.getElementById("salario");

  chrome.storage.sync.get(["salario"]).then((res) => {
    inputSalario.value = res.salario;
  });

  document.getElementById("saveSalario").addEventListener("click", () => {
    chrome.storage.sync.set({
      salario: inputSalario.value,
    });

    var snackbar = document.getElementById("snackbar");
    snackbar.className = "show";

    setTimeout(function () {
      snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
  });
};
