function fetchPrice(item) {
    return new Promise(resolve => {
        var pair = item.pair
        fetch(`https://decrypto-1fz0.onrender.com/api/market_data/trade_history?pair=${pair}`)
            .then((data) => {
                data.json().then(data => {
                    var newData = JSON.parse(data)
                    resolve(newData[0].p)
                })
            })
    })
}
export default fetchPrice