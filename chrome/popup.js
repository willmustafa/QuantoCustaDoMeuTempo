const inputSalario = document.getElementById('salario')

chrome.storage.sync.get("salario", ({ salario }) => {
    inputSalario.value = salario;
});

document.getElementById('saveSalario').addEventListener("click", ()=>{
    const salario = inputSalario.value
    chrome.storage.sync.set({ salario });
});