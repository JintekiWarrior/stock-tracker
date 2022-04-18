const stockSymbolForm = document.querySelector("#stock-symbol-form")

let stockSymbol

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

const submitStockFormHandler = e => {
  e.preventDefault()
  const stockSymbolInput = document.querySelector("input[name='stock-symbol-input']").value
  stockSymbol = stockSymbolInput

  // This API returns intraday time series (timestamp, open, high, low, close, volume) of the equity specified.
  const url = `https://alpha-vantage.p.rapidapi.com/query?interval=5min&function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&datatype=json&output_size=compact`

  const options = {
    headers: {
      'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com',
      'X-RapidAPI-Key': 'b999665da7msh0b6f060f93e1a73p1a683bjsn682b079d95ac'
    }
  }

  let stockData

  const getFinData = (url, options) => {
    fetch(url, options)
    .then(response => response.json())
    .then(response => {
      stockData = separateKeyAndValue(response["Time Series (5min)"])
      return stockData
    })
    .then(stockData => {
      const ctx = document.querySelector('#myChart')

      let stockOpen = []

      for (let i = 0; i < stockData.values.length; i++) {
        stockOpen.push(stockData.values[i]["1. open"])
      }

      console.log("keys", stockData.keys)

      const myChart = new Chart(ctx, {
        // tells what type of chart
        type: 'line',
        // data going into the chart
        data: {
          labels: stockData.keys.reverse(),
          datasets: [
            {
              // represents this dataset
              label: stockSymbol,
              data: stockOpen
            }
          ]
        }
      })

      console.log("values", stockOpen)
      
      const data = {
        labels: stockOpen,
        datasets: [{
          label: 'My First Dataset',
          data: stockOpen.reverse(),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      };      
    })
    .catch(err => console.error(err));
  }

  getFinData(url, options)
}

stockSymbolForm.addEventListener("submit", submitStockFormHandler)




