const siteClasses = {
    'www.google.com': {
        price: '.lmQWe.pVBUqb',
        putHere: '.zxVpA.PsMXm'
    }
}

let currentTab = document.location.host;

window.addEventListener('load', async function (){

    if(currentTab == 'www.google.com'){

        chrome.storage.sync.get(['salario']).then(result => {
            const salarioInput = getNumericValue(result.salario);

            const valorHora = salarioInput / (8 * 5 * 4);

            const produtos = document.querySelectorAll(siteClasses[currentTab].price);
            const produtosPutHere = document.querySelectorAll(siteClasses[currentTab].putHere)

            for (let i = 0; i < produtos.length; i++) {
                const valorProduto = clearMoney(produtos[i].innerHTML);
                const valorFinal = valorProduto/valorHora > 1 ? Math.ceil(valorProduto/valorHora) : valorProduto/valorHora;

                let elHoras = document.createElement("p");
                elHoras.className = 'button-hours';

                let texto;
                if (valorFinal >= 1) {
                    texto = `${valorFinal} ${valorFinal === 1 ? "hora" : "horas"} de trabalho.`;
                } else {
                    let minutos = Math.round(valorFinal * 60);
                    texto = `${minutos} ${minutos === 1 ? "minuto" : "minutos"} de trabalho.`;
                }

                elHoras.innerText = texto;

                produtosPutHere[i].append(elHoras)
            }
        });
    }
})

function getNumericValue(value) {
    let numericValue = value
        .replace(/[R$\s.]/g, "")
        .replace(",", ".");

    return parseFloat(numericValue) || 0;
}

function clearMoney(value){
    return Number.parseFloat(
        value.replace(/\D+/g, '')
    )/100
}