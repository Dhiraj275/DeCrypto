function fetchPrice(item) {
    return new Promise(resolve => {
        var pair = item.pair
        fetch(`http://localhost:4000/api/market_data/trade_history?pair=${pair}`)
            .then((data) => {
                data.json().then(data => {
                    var newData = JSON.parse(data)
                    resolve(newData[0].p)
                })
            })
    })
}
export default fetchPrice