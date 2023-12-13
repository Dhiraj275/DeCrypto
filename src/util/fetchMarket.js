
function fetchPrice(ticker) {
  return new Promise(resolve => {
    fetch('https://decrypto-1fz0.onrender.com/api/exchange/market_details')
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
            fetch(`https://decrypto-1fz0.onrender.com/api/market_data/trade_history?pair=${pair}`)
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