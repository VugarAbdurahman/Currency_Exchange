const amount = document.querySelector("#amount"),
  dropList = document.querySelectorAll(".drop-list select"),
  exchange = document.querySelector(".exchange"),
  convertBtn = document.querySelector(".convert"),
  showRate = document.querySelector(".exchange_rate"),
  selectBox = document.querySelector(".select-box")

// Show currenies into the option
dropList.forEach((curr, id) => {
  for (const country_code in countries) {
    // Default Currency
    let selected
    if (id == 0 && country_code == "USD") {
      selected = "selected"
    } else if (id == 1 && country_code == "AZN") {
      selected = "selected"
    }

    let option = `<option value="${country_code}" ${selected}>${country_code}</option>`

    curr.insertAdjacentHTML("beforeend", option)
  }
  curr.addEventListener("change", (e) => {
    getFlag(e.target)
  })
})
// When the page loads
window.addEventListener("load", () => {
  getExchangeRate()
})
// Get Flag function
function getFlag(e) {
  for (code in countries) {
    if (code == e.value) {
      let imgUrl = `https://flagsapi.com/${countries[code]}/flat/32.png`
      selectBoxImgTag = e.parentElement.querySelector(".select-box img")
      selectBoxImgTag.src = imgUrl
    }
  }
}

// Exchange Button
const fromText = document.querySelector("#from")
const toText = document.querySelector("#to")

exchange.addEventListener("click", () => {
  let tempFrom = toText.value
  toText.value = fromText.value
  fromText.value = tempFrom
  getExchangeRate()
  getFlag(fromText)
  getFlag(toText)
})

// When click the convert button
convertBtn.addEventListener("click", (e) => {
  e.preventDefault()
  getExchangeRate()
})

// Exchange currency function
function getExchangeRate() {
  let amountValue = amount.value
  if (amountValue == "" || amountValue == 0) {
    amount.value = "1"
    amountValue = 1
  }
  let from = dropList[0] // From
  let to = dropList[1] // To
  showRate.innerText = "Getting exchange rate ..."

  apiUrl = `https://v6.exchangerate-api.com/v6/447bc40836e50c95ba64c513latest/${from.value}`

  fetch(apiUrl)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.conversion_rates[to.value]
      let resultRate = (amount.value * exchangeRate).toFixed(3)
      showRate.innerText = `${amountValue} ${from.value} = ${resultRate} ${to.value}`
    })
}
