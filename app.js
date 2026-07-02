//ACCEESS ELEMENTS
const dropDowns = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")


//ADD EVENT WHEN THE OBJECT IS LOADED
window.addEventListener("load",()=>{
    updateExChangeRate();
})


//ADD VALUES /OPTION OF DROPDOWNS
for(let select of dropDowns){
    for(let code in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if(select.name === "from" && code=== "USD"){
            newOption.selected = "selected"
        }
        if(select.name === "to" && code=== "INR"){
            newOption.selected = "selected"
        }
        select.append(newOption)
    }

    select.addEventListener("change",(event)=>{
        updateFlag(event.target)
    })
}


//UPDATE FLAG IMAGE
const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}


//SWAP CURRENCY
const swapBtn = document.querySelector(".dropdown i");

swapBtn.addEventListener("click", () => {
    let temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = temp;

    updateFlag(fromCurr);
    updateFlag(toCurr);

    updateExChangeRate();
});

// ADD EVENT LISTNER WHEN BUTTON IS CLICKED
btn.addEventListener("click", (event)=>{
    event.preventDefault();
    updateExChangeRate()
})


//GET THE VALUE OF EXCHNAGE RATE
const updateExChangeRate =async ()=>{
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval<0 || amtval==""){
        amtval = 1;
        amount.value = "1"
    }

    console.log(fromCurr.value,toCurr.value);
    
    const url = `https://open.er-api.com/v6/latest/${fromCurr.value}`
    const response = await fetch(url);
    const data = await response.json()
    const rate = data.rates[toCurr.value]
    let finalAmount = amtval*rate;

    msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
}