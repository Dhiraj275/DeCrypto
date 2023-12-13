"use client"
import MainCover from "@/components/MainCover";
import Graph from "@/components/coin/chart";
import fetchPrice from "@/util/fetchMarket";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
export default function Page({ params }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [cryptoData, setCryptoData] = useState([])
  const [coinCurrentPrice, setCoinCurrentPrice] = useState("Loading...")
  useEffect(() => {
    console.log(params)
    async function fetchData() {
      setCoinCurrentPrice(await fetchPrice(params.coin))
    }
    fetchData();

    fetch(`https://decrypto-1fz0.onrender.com/api/exchange/market_details/coins`)
      .then((data) => {
        data.json().then(data => {
          setCryptoData(data)
        })
      })

  }, [])
  const matchQuery = (item) => {
    return item.name.toLowerCase().includes(searchQuery) || item.currency.toLowerCase().includes(searchQuery)
  }
  return (
    <MainCover>
      <div className="coin h-[100%]">
        <div className="grid grid-cols-12 gap-4  h-[100%]" >
          <div className="lg:col-span-9 col-span-12">
            <div className="left">
              <div className="coin-details">
                <img className='image' src={`https://cdn.coindcx.com/static/coins/${params.coin.toLowerCase()}.svg`} />
                <div className="info">
                  <div className="name">{params.coin}</div>

                  <div className="price">&#x20B9;{coinCurrentPrice}</div>

                </div>
              </div>
              <div className="graph">
                <Graph pair={params.pair} />
              </div>
            </div>
          </div>
          <div className="lg:col-span-3 col-span-12">
            <div className="side-bar">
              <div className="box">
                <input name="search" onChange={(e) => setSearchQuery(e.target.value.toLowerCase())} placeholder='Search Coin' />
                <ul>
                  {
                    cryptoData.map((item, key) => {
                      if (searchQuery !== "") {
                        if (matchQuery(item)) {
                          return (
                            <TickerItem  key={key} item={item} />
                          )
                        }
                      } else {
                        return (
                          <TickerItem  key={key} item={item} />
                        )
                      }
                    })
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainCover>
  )
}
const TickerItem = ({ item }) => {
  const navigation = useRouter()
  const addToWatchList = () => {
    navigation.replace(`/coin/${item.currency}/${item.pair}`)
  }
  return (
    <div onClick={addToWatchList} className='crypto-item'>
      <img className='image' src={`https://cdn.coindcx.com/static/coins/${item.currency.toLowerCase()}.svg`} />
      <div className="name"><span>{item.name}</span>{item.currency} </div>
    </div>
  )
}