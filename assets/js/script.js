const stockSymbolForm = document.querySelector("#stock-symbol-form")

let myChart

// Getting data from api and need the specific data points to be in arrays
const separateKeyAndValue = (obj) => {
  const result = {
    keys: [],
    values: []
  }

  for (let key in obj) {
    let value = obj[key]

    result.keys.push(key)
    result.values.push(value)
  }

  return result
}

// Handles displaying the chart
const displayChart = (stockData, stockSymbol) => {
  if (myChart) myChart.destroy()
  const ctx = document.querySelector('#myChart')

  let stockOpen = []
  let stockKeys = []

  for (let i = 0; i < stockData.values.length; i++) {
    if (i % 5 === 0) {
      stockOpen.push(stockData.values[i]["1. open"])
      stockKeys.push(Date.parse(stockData.keys[i]).toString("h:mm tt"))
      console.log(Date.parse(stockData.keys[i]).toString("ddd MMM d"))
    }
  }

  console.log("keys", stockKeys)
  console.log("values", stockOpen)

  myChart = new Chart(ctx, {
    // tells what type of chart
    type: 'line',
    // data going into the chart
    data: {
      labels: stockKeys.reverse(),
      datasets: [
        {
          // represents this dataset
          label: stockSymbol.toUpperCase(),
          data: stockOpen.reverse()
        }
      ]
    } 
  })

}

// This controls what happens when the submit button is clicked
const submitStockFormHandler = e => {
  e.preventDefault()
  let stockSymbol = document.querySelector("input[name='stock-symbol-input']").value

  // This API returns intraday time series (timestamp, open, high, low, close, volume) of the equity specified.
  const url = `https://alpha-vantage.p.rapidapi.com/query?interval=5min&function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&datatype=json&output_size=compact`

  const options = {
    headers: {
      'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com',
      'X-RapidAPI-Key': 'b999665da7msh0b6f060f93e1a73p1a683bjsn682b079d95ac'
    }
  }

  let stockData

  fetch(url, options)
    .then(response => response.json())
    .then(response => separateKeyAndValue(response["Time Series (5min)"]))
    .then(stockData => displayChart(stockData, stockSymbol))
    .catch(err => console.error(err));
}

stockSymbolForm.addEventListener("submit", submitStockFormHandler)




