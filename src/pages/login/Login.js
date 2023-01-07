import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { axiosClient } from '../../utils/axiosClient'
import { KEY_ACCESS_TOKEN, setItem } from '../../utils/localStorageClient'
import './Login.scss'

function Login() {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const result = await axiosClient.post('auth/login',{
          email, 
          password
        });
        console.log(result)
        setItem(KEY_ACCESS_TOKEN, result.accessToken);
        navigate('/')
      } catch (error) {
        console.log(error)
      }
      
  }

  return (
    <div className='Login'>
      <div className='Login-Box'>
        <h2 className='heading'>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' className='email' onChange={(e) => setEmail(e.target.value)}></input>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' className='password' onChange={(e) => setPassword(e.target.value)}></input>
          <input type='submit' className='submit' id='submit'></input>
        </form>
        <p className='subheading'>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
      </div>
    </div>
  )
}

export default Login