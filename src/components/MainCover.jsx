import React, { useState } from 'react'
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import { AuthProvider } from '@/providers/AuthProvider'
import Backdrop from './UI/Backdrop'

const MainCover = ({ children }) => {
    const [isSearchOpen, setSearchOpen] = useState(true)
    return (
        <>
            <AuthProvider>
                <Navbar />
                <div className="main-container">
                    <Sidebar />
                    <div className='page'>
                        {children}
                    </div>
                </div>
            </AuthProvider>
        </>
    )
}

export default MainCover