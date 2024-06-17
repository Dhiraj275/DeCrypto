import { database } from '@/config/firebase'
import { AuthContext } from '@/providers/AuthProvider'
import fetchPrice from '@/util/fetchPrice'
import { Delete } from '@mui/icons-material'
import { ref, remove } from 'firebase/database'
import Link from "next/link"
import React, { useContext, useEffect, useState } from 'react'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
const CryptoCard = ({ item, setWatchList = () => { }, showPrice = true, currency = "", img }) => {
    const [price, setPrice] = useState(0)
    const { user, fetchUser, setUser } = useContext(AuthContext)
    useEffect(() => {
        async function fetchData() {
            setPrice(await fetchPrice(item))
        }
        showPrice && fetchData();
    }, [])
    var i = 0;
    const deleteFromWatchList = () => {
        if (user) {
            const watchListRef = ref(database, `/users/${user.uid}/watchList/${item.pair}`)
            remove(watchListRef).then(async () => {
                const newData = await fetchUser();
                setUser(newData);
                setWatchList(newData.watchList)
            })
        }
    }
    return (
        <div className='crypto-card'>
            <div className="img">
                {showPrice && <button onClick={deleteFromWatchList} className="delete">
                    <Delete />
                </button>}
                <img id="matic" src={`https://cdn.coindcx.com/static/coins/${(img ? img : item.name).toLowerCase()}.svg`} alt="" />
            </div>
            <div className="detail flex justify-between">
                <div>
                    <div className="name"><span>{item.name}</span><br />{currency} </div>
                    {showPrice && <h5 className="price">&#x20B9;{price.toLocaleString('en-IN')}</h5>}
                </div>
                <Link href={`coin/${img ? img : item.name}/${item.pair}`}><OpenInNewIcon color="#fff" /></Link>
            </div>
        </div>
    )
}

export default CryptoCard