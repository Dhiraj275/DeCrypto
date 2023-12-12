
function fetchPrice(ticker) {
  return new Promise(resolve => {
    fetch('http://localhost:4000/api/exchange/market_details')
      .then((data) => {
        data.json().then(data => {
          var newData = JSON.parse(data)
          var targetTicker = newData.filter(
            (item) =>
              item.target_currency_short_name == ticker
              &&
              item.base_currency_short_name === "INR"
          )[0]
          if (targetTicker) {
            var pair = targetTicker.pair
            fetch(`http://localhost:4000/api/market_data/trade_history?pair=${pair}`)
              .then((data) => {
                data.json().then(data => {
                  var newData = JSON.parse(data)
                  resolve(newData[0].p)
                })
              })
          }
          else {
            resolve(0)
          }
        })
      })
  })
}
export default fetchPrice