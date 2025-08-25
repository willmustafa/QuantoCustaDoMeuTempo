const siteClasses = {
    'www.amazon.com.br': {
        price: '.a-price .a-offscreen',
        putHere: '#corePrice_feature_div'
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
    'www.shoptime.com.br': {
        price: '.priceSales',
        putHere: '.src__PriceWrapper-sc-17hp6jc-4.fNgChL'
    },
    'www.pontofrio.com.br': {
        price: '.product-price-value',
        putHere: '#product-price-box'
    },
    'www.kabum.com.br': {
        price: 'h4.text-4xl',
        putHere: 'h4.text-4xl'
    },
    'www.kalunga.com.br': {
        price: '#precovenda',
        putHere: '.produtoinfos__price-group'
    },
    'www.fastshop.com.br': {
        price: '.user-has-not',
        putHere: '.price-current'
    },
    'www.buscape.com.br': {
        price: '.Text_DesktopHeadingM__4_pVt',
        putHere: '.Price_PriceWrapper__m2HLg'
    },
    'www.google.com': {
        price: '.Price_Price__1lPWw>a>strong',
        putHere: '.Price_Price__1lPWw'
    },
}

let currentTab = document.location.host;

function getNumericValue(value) {
    let numericValue = value
        .replace(/[R$\s.]/g, "")
        .replace(",", ".");

    return parseFloat(numericValue) || 0;
}

window.addEventListener('load', async function (){

    browser.storage.sync.get(['salario']).then(result => {
        const salarioInput = getNumericValue(result.salario);

        const valorHora = salarioInput / (8 * 5 * 4);
        const valorProduto = clearMoney(document.querySelector(siteClasses[currentTab].price).innerHTML);
        const valorFinal = valorProduto/valorHora > 1 ? Math.ceil(valorProduto/valorHora) : valorProduto/valorHora;

        if(currentTab == 'www.mercadolivre.com.br' || currentTab == 'produto.mercadolivre.com.br' || currentTab == 'www.shopee.com.br'){
            const valorProduto = clearMoney(document.querySelector(siteClasses[currentTab].price).innerHTML)*100;
            const valorFinal = valorProduto/valorHora > 1 ? Math.ceil(valorProduto/valorHora) : valorProduto/valorHora;

            window.setTimeout(function(){insertElement(valorFinal)}, 1000)
        }else{            
            insertElement(valorFinal)
        }
    });

})

function insertElement(valorFinal){
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
    document.querySelector(siteClasses[currentTab].putHere).append(elHoras);
}

function clearMoney(value){
    return Number.parseFloat(
        value.replace(/\D+/g, '')
    )/100
}