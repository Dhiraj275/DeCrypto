"use client"
import MainCover from '@/components/MainCover';
import WatchList from '@/components/home/WatchList';
import SearchIcon from '@mui/icons-material/Search';

export default function Home() {

  return (
    <>
      <MainCover>
        <div className="top-seach-bar">
          <input type="search" placeholder='Search' />
          <SearchIcon />
        </div>
        <WatchList />
      
      </MainCover>
    </>

  )
}
