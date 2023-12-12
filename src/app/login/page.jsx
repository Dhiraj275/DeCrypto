"use client"
import Navbar from '@/components/Navbar'
import { AuthContext, AuthProvider } from '@/providers/AuthProvider'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'

const LoginPage = () => {
  return (
    <AuthProvider>
      <LoginComponent />
    </AuthProvider>
  )
}
const LoginComponent = () => {
  const { user, login } = useContext(AuthContext)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const router = useRouter()
  const [formData, setFormData] = useState({
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    const { email, password } = formData
    var status = await login({ email, password, setErrorMsg })
    if (status == "success") {
      router.push("/")
    }
  }
  return (
    <>
      <Navbar />
      <div className="auth-page">
        <div className="section">
          <h3><span>Login</span></h3>
          <form onSubmit={handleSubmit}>
            {errorMsg.msg}
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
            <button type='submit'><span>Login</span></button>
          </form>

          <Link href={"/signup"}>Create an Account</Link>
        </div>
      </div>
    </>
  )
}
export default LoginPage