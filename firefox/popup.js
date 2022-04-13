const inputSalario = document.getElementById('salario')

browser.storage.sync.get(['salario']).then((res) => {
    inputSalario.value = res.salario;
});

document.getElementById('saveSalario').addEventListener("click", () => {
    browser.storage.sync.set({salario: inputSalario.value});
});