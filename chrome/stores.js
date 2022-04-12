const siteClasses = {
    'www.amazon.com.br': {
        price: '.a-price.aok-align-center .a-offscreen',
        putHere: '#corePrice_feature_div'
    },
    'www.submarino.com.br': {
        price: '.src__BestPrice-sc-1jnodg3-5.ykHPU.priceSales',
        putHere: '.src__BestPrice-sc-1jnodg3-5.ykHPU.priceSales'
    },
    'www.mercadolivre.com.br': {
        price: '.ui-pdp-price__second-line .andes-money-amount__fraction',
        putHere: '.ui-pdp-price'
    },
    'produto.mercadolivre.com.br': {
        price: '.ui-pdp-price__second-line .andes-money-amount__fraction',
        putHere: '.ui-pdp-price'
    },
    'www.americanas.com.br': {
        price: '.styles__PriceText-sc-x06r9i-0.dUTOlD.priceSales',
        putHere: '.best-price__PriceWrapper-sc-sqiicq-4.VBWlB'
    },
    'www.magazineluiza.com.br': {
        price: '.price-template__text',
        putHere: '.price-template-price-block'
    },
    'www.magazineluiza.com.br': {
        price: '.price-template__text',
        putHere: '.price-template-price-block'
    },
    'www.shopee.com.br': {
        price: '._2v0Hgx',
        putHere: '.flex items-center._1V_Jxg'
    },
    'www.casasbahia.com.br': {
        price: '.product-price-value',
        putHere: '#product-price-box'
    },
    'pt.aliexpress.com': {
        price: '.uniform-banner-box-price',
        putHere: '.product-price'
    },
    'www.netshoes.com.br': {
        price: '.default-price>span>strong',
        putHere: '.default-price.saving.installments'
    },
    'www.netshoes.com.br': {
        price: '.default-price>span>strong',
        putHere: '.default-price.saving.installments'
    },
    'www.shoptime.com.br': {
        price: '.priceSales',
        putHere: '.src__PriceWrapper-sc-17hp6jc-4.fNgChL'
    },
    'www.pontofrio.com.br': {
        price: '.product-price-value',
        putHere: '#product-price-box'
    },
    'www.kabum.com.br': {
        price: '.finalPrice',
        putHere: '#blocoValores'
    },
    'www.kalunga.com.br': {
        price: '.produtoinfos__price>span',
        putHere: '.produtoinfos__price'
    },
    'www.fastshop.com.br': {
        price: '.user-has-not',
        putHere: '.price-current'
    },
    'www.buscape.com.br': {
        price: '.Price_Price__1lPWw>a>strong',
        putHere: '.Price_Price__1lPWw'
    },
    'www.google.com': {
        price: '.Price_Price__1lPWw>a>strong',
        putHere: '.Price_Price__1lPWw'
    }

}

let currentTab = document.location.host;

window.addEventListener('load', async function (){

    chrome.storage.sync.get(['salario'], function(result) {
        const salarioInput = result.salario;

        const valorHora = salarioInput / (8 * 5 * 4);
        const valorProduto = clearMoney(document.querySelector(siteClasses[currentTab].price).innerHTML);
        const valorFinal = Math.ceil(valorProduto/valorHora);

        if(currentTab == 'www.mercadolivre.com.br' || currentTab == 'produto.mercadolivre.com.br' || currentTab == 'www.shopee.com.br'){
            const valorProduto = clearMoney(document.querySelector(siteClasses[currentTab].price).innerHTML)*100;
            const valorFinal = Math.ceil(valorProduto/valorHora);

            window.setTimeout(function(){insertElement(valorFinal)}, 1000)
        }else{            
            insertElement(valorFinal)
        }
    });

})

function insertElement(valorFinal){
    let elHoras = document.createElement("p")
    elHoras.className = 'button-hours'
    elHoras.innerText = `${valorFinal} horas de trabalho.`
    document.querySelector(siteClasses[currentTab].putHere).append(elHoras)
}

function clearMoney(value){
    return Number.parseFloat(
        value.replace(/\D+/g, '')
    )/100
}