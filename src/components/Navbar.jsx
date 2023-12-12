import React, { useContext, useEffect, useState } from 'react'
import UserIcon from "@mui/icons-material/Person"
import Link from 'next/link'
import { AuthContext } from '@/providers/AuthProvider'

const Navbar = () => {
  const [location, setLocation] = useState("")
  const [navbarOpen, setNavbarOpen] = useState(false)
  const { user, logout } = useContext(AuthContext)
  useEffect(
    () => {
      setLocation(window.location.pathname)
    }
    , [])
  const toggleNavbar = () => {
    const navbar = document.querySelector(".navbar")
    if (navbar.classList.contains("active")) {
      navbar.classList.remove("active")
    }
    else {
      navbar.classList.add("active")
    }
    setNavbarOpen(!navbarOpen)
  }
  return (
    <div className="navbar">
      <div onClick={toggleNavbar} className="backdrop-closer"></div>
      <div className='left'>
        <div onClick={toggleNavbar} className="menu-toggle-icon">
          <img src={`/images/icons/${navbarOpen ? 'close_icon' : 'menu_bar'}.svg`} alt="" />
        </div>
        <div className="logo">
          DeCryto
        </div>
      </div>
      <nav>
        <ul>

          <li><Link className={location === "/" ? "active" : ""} href="/" >Home</Link></li>
          <li><Link className={location === "/market" ? "active" : ""} href="/market" >Market</Link></li>
          <li><Link className={location === "/about" ? "active" : ""} href="/about">About</Link></li>
        </ul>
      </nav>
      <div className="right">
        <div className="curruncy"></div>
        <div className="profile">
          <div className='flex items-center'>
            <div className="profile-icon">
              <UserIcon />
            </div>
            <div className="user-menu">
              <div className="div">Hello, {user?user.email.split("@")[0]:"User"}</div>
              <ul>
                {
                !user&&
                <>
                  <li><a href="/login">Login</a></li>
                  <li><a href="/signup">Register</a></li>
                </>
                }
                  {user&&<li><a onClick={()=>logout()} href="#">Logout</a></li>}

              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar