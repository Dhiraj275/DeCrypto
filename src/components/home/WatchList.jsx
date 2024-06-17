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
    const [isLoading, setIsLoading] = useState(true)
    const { user } = useContext(AuthContext)
    const [watchList, setWatchList] = useState([])

    useEffect(() => {
        fetch(`https://decrypto-1fz0.onrender.com/api/market_data/trade_history?pair=I-BNB_INR`).then(() => {
            setIsLoading(false)
        })
        if (user) {
            setWatchList(user.watchList)
        }
        else {
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
            <Backdrop open={isLoading} setOpen={()=>{}}>
                <div className="inner">
                    <h4>Just a Moment! 😊</h4>
                    <p>Hi there! <span>I&apos;m</span> so happy you’re here. Our server needs a little time to wake up and get ready – about <span>1-2 minutes</span>.</p>

                    <p>While you wait, feel free to grab a coffee or enjoy a little break. Thanks for your patience and understanding!</p>
                    <div className="loader">
                        <div class="server-rack">
                            <div class="fan-body">
                                <div class="fan">
                                    <img src='/images/icons/fan.svg' />
                                </div>
                            </div>
                            <div class="fan-body">
                                <div class="fan">
                                    <img src='/images/icons/fan.svg' />
                                </div>
                            </div>
                            <div class="fan-body">
                                <div class="fan">
                                    <img src='/images/icons/fan.svg' />
                                </div>
                            </div>
                            <div class="fan-body">
                                <div class="fan">
                                    <img src='/images/icons/fan.svg' />
                                </div>
                            </div>
                            <div class="start-button">
                                <img src='/images/icons/start-switch.svg' />
                            </div>
                        </div>
                    </div>
                </div>
            </Backdrop>
            <Backdrop open={isSearchOpen} setOpen={setSearchOpen}>
                <SearchTicker setWatchList={setWatchList} setOpen={setSearchOpen} />
            </Backdrop>
        </>
    )
}
export default WatchList