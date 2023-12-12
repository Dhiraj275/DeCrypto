"use client"
import MainCover from '@/components/MainCover'
import fetchPrice from '@/util/fetchMarket'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'

const Portfolio = () => {
    const [totalBalance, setTotalBalance] = useState(0)
    const [holdings, setHoldings] = useState([])
    function getAllocation(price) {
        return `${Math.round((price / totalBalance) * 100)}%`
    }

    useEffect(() => {
        if (window.localStorage.getItem("totalBalance") && window.localStorage.getItem("holdings")) {
            setTotalBalance(window.localStorage.getItem("totalBalance"))
            setHoldings(JSON.parse(window.localStorage.getItem("holdings")))
        }

        const holdingArr = []
        fetch("http://localhost:4000/user/balance")
            .then(data => {
                var totalAmmount = 0
                data = data.json();
                data.then(async data => {
                    var INR = data.filter(item => item.currency === "INR")[0]
                    totalAmmount += parseFloat(INR.balance)
                    holdingArr.push({
                        name: "INR",
                        ammount: parseFloat(INR.balance).toLocaleString('en-IN'),
                        price: "-",
                        total: parseFloat(INR.balance).toLocaleString('en-IN')
                    })
                    for (let index in data) {
                        var coin = data[index]
                        var currency = coin.currency
                        var ammount = parseFloat(coin.balance)
                        var price = await fetchPrice(currency)

                        if (price && (ammount * price) > 100) {
                            totalAmmount += (ammount * price)
                            holdingArr.push({
                                name: currency,
                                ammount: ammount.toLocaleString('en-IN'),
                                allocation: "40%",
                                price: price.toLocaleString('en-IN'),
                                total: (ammount * price).toLocaleString('en-IN')
                            })

                        }
                    }
                    fetch("http://localhost:4000/binance/user/balance")
                        .then(data => {
                            data.json().then(async data => {
                                for (let index in data) {
                                    var coin = data[index]
                                    var currency = coin.currency
                                    var ammount = parseFloat(coin.balance)
                                    var price = await fetchPrice(currency)

                                    if (price && (ammount * price) > 100) {
                                        totalAmmount += (ammount * price)
                                        holdingArr.push({
                                            name: currency,
                                            ammount: ammount.toLocaleString('en-IN'),
                                            allocation: "40%",
                                            price: price.toLocaleString('en-IN'),
                                            total: (ammount * price).toLocaleString('en-IN')
                                        })
                                        var jsonString = JSON.stringify(holdingArr)
                                        window.localStorage.setItem("holdings", jsonString)
                                        window.localStorage.setItem("totalBalance", totalAmmount.toLocaleString('en-IN'))
                                        setHoldings(holdingArr)
                                        setTotalBalance(totalAmmount.toLocaleString('en-IN'))

                                    }
                                }
                            })
                        })
                })
            })
    }, [])

    return (
        <MainCover>
            <Head>
                <title>DeCrypto | Portfolio Tracker</title>
            </Head>
            <div className="section portfolio">
                <img src="/images/portfolio/portfolio_bg.svg" alt="" />
                <div className='detail'>
                    <div>
                        <span className='title'>Portfolio Balance</span> <br />
                        <span className='balance'>&#x20B9;{totalBalance}</span>
                    </div>
                </div>
            </div>
            <div className="section holding">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Alocation</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            holdings.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <div className='flex items-center'><img style={{ width: "20px", marginRight: "10px" }} src={`https://cdn.coindcx.com/static/coins/${item.name.toLowerCase()}.svg`} alt="" />{item.name}</div>
                                        </td>
                                        <td>{item.ammount}</td>
                                        <td>{getAllocation(item.total)}</td>
                                        <td>&#x20B9;{item.price}</td>
                                        <td>&#x20B9;{item.total}</td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </MainCover>
    )
}

export default Portfolio