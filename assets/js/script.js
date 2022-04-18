const stockSymbolForm = document.querySelector("#stock-symbol-form")

const stockSymbolButton = document.querySelector("#stock-symbol-button")

// const submitStockSymbol = (button, value) => {
//   let stockSymbol
//   button.addEventListener("click", (e) => {
//     e.preventDefault()
//     console.log(value)
//   })
//   return stockSymbol 
// }
let stockSymbol

const submitStockFormHandler = e => {
  e.preventDefault()
  const stockSymbolInput = document.querySelector("input[name='stock-symbol-input']").value
  stockSymbol = stockSymbolInput
}

stockSymbolForm.addEventListener("submit", submitStockFormHandler)

stockSymbolButton.addEventListener("click", e => {
  e.preventDefault()
  console.log(stockSymbolInput)
})

submitStockSymbol(stockSymbolButton, stockSymbolInput)

// This API returns intraday time series (timestamp, open, high, low, close, volume) of the equity specified.
const url = `https://alpha-vantage.p.rapidapi.com/query?interval=5min&function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&datatype=json&output_size=compact`

const options = {
  headers: {
		'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com',
		'X-RapidAPI-Key': 'b999665da7msh0b6f060f93e1a73p1a683bjsn682b079d95ac'
	}
} 

const getFinData = (url, options) => {
  fetch(url, options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
}

getFinData(urlIntraday, options)