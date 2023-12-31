import { database } from '@/config/firebase';
import { AuthContext } from '@/providers/AuthProvider';
import { ref, set } from 'firebase/database';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
const SearchTicker = ({ setOpen, setWatchList }) => {
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
        <div className="section search-ticker">
            <input name="search" onChange={(e) => setSearchQuery(e.target.value.toLowerCase())} placeholder='Search Coin' />
            <div className="crypto-list">
                {
                    cryptoData.map((item, key) => {
                        if (searchQuery !== "") {
                            if (matchQuery(item)) {
                                return (
                                    <TickerItem key={key} setWatchList={setWatchList} setOpen={setOpen} item={item} />
                                )
                            }
                        } else {
                            return (
                                <TickerItem key={key} setWatchList={setWatchList} setOpen={setOpen} item={item} />
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}
const TickerItem = ({ item, setOpen, setWatchList }) => {
    const { user, setUser, fetchUser } = useContext(AuthContext)
    const router  = useRouter()
    const addToWatchList = () => {
        if (user) {
            const watchListRef = ref(database, `/users/${user.uid}/watchList/${item.pair}`)
            const watchList = [...user.watchList]
            set(watchListRef, { name: item.currency }).then(async () => {
                setOpen(false)
                watchList.push({ name: item.currency, pair: item.pair })
                const newData = await fetchUser();
                setUser(newData);
                setWatchList(newData.watchList)

            })
        }
        else{
            router.push("/login")
        }
    }
    return (
        <div onClick={addToWatchList} className='crypto-item'>
            <img className='image' src={`https://cdn.coindcx.com/static/coins/${item.currency.toLowerCase()}.svg`} />
            <div className="name"><span>{item.name}</span>{item.currency} </div>
        </div>
    )
}
export default SearchTicker