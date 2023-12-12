import React from 'react'
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import Link from "next/link"
const Sidebar = () => {
  const chains = [
    { code: "BTC", name: "Bitcoin", pair:"I-BTC_INR" },
    { code: "ETH", name: "Ethereum", pair:"I-ETH_INR" },
    { code: "SOL", name: "Solana", pair:"I-SOL_INR" },
    { code: "ADA", name: "Cardano", pair:"I-ADA_INR" },
    { code: "MATIC", name: "Polygon", pair:"I-MATIC_INR" },
    { code: "DOT", name: "Polkadot", pair:"I-DOT_INR" },
    { code: "AVAX", name: "Avalanche", pair:"I-AVAX_INR" },
    { code: "XTZ", name: "Tezos", pair:"I-XTZ_INR" },
    { code: "LINK", name: "Chainlink", pair:"I-LINK_INR" }
  ];
  return (
    <div className="side-bar">
      <div className="box">
        <CurrencyBitcoinIcon />Chains
        <ul>
          {
            chains.map((item, index) => {
              return (
                <li key={index}>
                  <Link href={`/coin/${item.code}/${item.pair}`}>
                    <img src={`https://cdn.coindcx.com/static/coins/${item.code.toLowerCase()}.svg`} alt="" />
                    <div className="name">{item.name}</div>
                  </Link>
                </li>
              )
            })}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar