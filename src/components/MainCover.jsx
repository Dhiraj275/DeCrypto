import React from 'react'
import Navbar from './navbar'
import Sidebar from './Sidebar'
import { AuthProvider } from '@/providers/AuthProvider'

const MainCover = ({ children }) => {
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