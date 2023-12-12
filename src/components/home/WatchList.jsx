import Backdrop from '@/components/UI/Backdrop';
import SearchTicker from '@/components/home/SearchTicker';
import { AuthContext } from '@/providers/AuthProvider';
import AddIcon from '@mui/icons-material/Add';
import React, { useContext, useEffect, useState } from 'react';
import CryptoCard from './CryptoCard';
import { CircularProgress } from '@mui/material';
const WatchList = ({ open, setOpen }) => {
    const { user } = useContext(AuthContext)
    if (user === undefined) {
        return (
            <div className="flex justify-center items-center h-[60%]">
                <CircularProgress />
            </div>
        )
    }
    else {
        return <WatchListComponent setOpen={setOpen} open={open} />
    }
}

const defaultList = [{ "name": "BTC", "pair": "I-BTC_INR" }, { "name": "ETH", "pair": "I-ETH_INR" }, { "name": "BNB", "pair": "I-BNB_INR" }, { "name": "SOL", "pair": "I-SOL_INR" }, { "name": "DOGE", "pair": "I-DOGE_INR" }, { "name": "MATIC", "pair": "I-MATIC_INR" }, { "name": "LINK", "pair": "I-LINK_INR" }, { "name": "MANA", "pair": "I-MANA_INR" }];
const WatchListComponent = () => {
    const [isSearchOpen, setSearchOpen] = useState(false)
    const { user } = useContext(AuthContext)
    const [watchList, setWatchList] = useState([])

    useEffect(() => {
        if (user) {
            setWatchList(user.watchList)
        }
        else{
            setWatchList(defaultList)
        }
    }, [])
    return (
        <>
            <div className='crypto-grid'>
                <div className="grid md:grid-cols-3 2xl:grid-cols-5 xl:grid-cols-4 sm:grid-cols-2 grid-cols-2 gap-6">
                    {
                        watchList.map((item, key) => {
                            return (
                                <CryptoCard setWatchList={setWatchList} item={item} key={key} />
                            )
                        })
                    }
                    <div onClick={() => { setSearchOpen(true) }} className='crypto-card add-button'>
                        <div>
                            <AddIcon />
                        </div>
                        <span>Add to Watchlist</span>
                    </div>
                </div>

            </div>
            <Backdrop open={isSearchOpen} setOpen={setSearchOpen}>
                <SearchTicker setWatchList={setWatchList} setOpen={setSearchOpen} />
            </Backdrop>
        </>
    )
}
export default WatchList