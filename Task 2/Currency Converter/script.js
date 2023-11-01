const dropList = document.querySelectorAll(".select-list select"),
getButton = document.querySelector(".converter-app button"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select");

for (let i = 0; i < dropList.length; i++) {
    for(let currency_code in country_code){
        let selected = i == 0 ? currency_code == "USD" ? "selected" : "" : currency_code == "INR" ? "selected" : "";
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e =>{
        loadFlag(e.target);
    });
}


function getExchangeRate(){
    const amount = document.querySelector(".amount input");
    const exchangeRateTxt = document.querySelector(".exchange-rate");
    let amountVal = amount.value;
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Converting...";
    let url = `https://v6.exchangerate-api.com/v6/0c7b560dfcc2fb846cdba30c/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result =>{
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    }).catch(() =>{
        exchangeRateTxt.innerText = "Something went wrong";
    });
}


function loadFlag(element){
    const baseURL = "https://flagsapi.com/";

    for(let code in country_code){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("#flag-img");
            imgTag.src = `${baseURL}${country_code[code]}/shiny/64.png`;
        }
    }
}


window.addEventListener("load", ()=>{
    getExchangeRate();
});

getButton.addEventListener("click", e =>{
    e.preventDefault();
    getExchangeRate();
});

const exchangeIcon = document.querySelector("#icon");
exchangeIcon.addEventListener("click", ()=> {
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
})
