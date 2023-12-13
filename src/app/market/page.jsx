"use client"
import MainCover from '@/components/MainCover';
import CryptoCard from '@/components/home/CryptoCard';
import WatchList from '@/components/home/WatchList';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [cryptoData, setCryptoData] = useState([])
  useEffect(() => {

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
    <>
      <MainCover>
        <div className="top-seach-bar">
          <input type="search" onChange={(e) => setSearchQuery(e.target.value.toLowerCase())} placeholder='Search' />
          <SearchIcon />
        </div>
        <div className='crypto-grid'>
          <div className="grid md:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 2xl:grid-cols-5 grid-cols-2 gap-6">
            {
              cryptoData.map((item, key) => {
                if (searchQuery !== "") {
                  if (matchQuery(item)) {
                    return (
                      <CryptoCard showPrice={false} img={item.currency} currency={item.currency} item={item} key={key} />
                    )
                  }
                }
                else {
                  return <CryptoCard showPrice={false} img={item.currency} currency={item.currency} item={item} key={key} />

                }
              })
            }
          </div>
        </div>
      </MainCover>
    </>

  )
}
