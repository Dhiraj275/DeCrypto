"use client"
import Navbar from '@/components/Navbar'
import { AuthContext, AuthProvider } from '@/providers/AuthProvider'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

const SignupPage = () => {
    return(
        <AuthProvider>
          <SignupComponent />
        </AuthProvider>
      )
}

const  SignupComponent =()=>{
  const { user, register } = useContext(AuthContext)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: ""
  })
  const [errorMsg, setErrorMsg] = useState({
    msg: "",
    color: ""
  })
  let name, value;
  const handleChange = (event) => {
    name = event.target.name;
    value = event.target.value;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit =  async (e) => {
    e.preventDefault()
    const {email, name, password} = formData
    var status = await register({email, name, password, setErrorMsg})
    if(status=="success"){
      router.push("/portfolio")
    }
  }
  return (
    <>
      <Navbar />
      <div className="auth-page signup">
        <div className="section">
          <h3><span>Create an Account</span></h3>
          <form onSubmit={handleSubmit}>
            {errorMsg.msg}
            <div className="group">
              <label htmlFor="name">Name</label>
              <input name="name" onChange={handleChange} placeholder='Enter your name' id="name" type="text" required />
            </div>
            <div className="group">
              <label htmlFor="email">Email</label>
              <input name="email" onChange={handleChange} placeholder='Enter your email' id="email" type="email" required />
            </div>
            <div className="group">
              <label htmlFor="password">Password</label>
              <div className='password'>
                <input name="password" onChange={handleChange} placeholder='Enter your Password' id="password" type={passwordVisible ? "text" : 'password'} required />
                {
                  passwordVisible ?
                    <img onClick={() => setPasswordVisible(!passwordVisible)} src="/images/icons/eye-slash.svg" />
                    :
                    <img onClick={() => setPasswordVisible(!passwordVisible)} src="/images/icons/eye.svg" />
                }
              </div>
            </div>
            <button type='submit'><span>Sign Up</span></button>
          </form>

          <Link href={"/login"}>Have an Account? Login</Link>
        </div>
      </div>
    </>
  )
}

export default SignupPage