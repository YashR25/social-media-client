import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { TOAST_FAILURE, TOAST_SUCCESS } from '../../App'
import { showToast } from '../../redux/slices/appConfigSlice'
import { axiosClient } from '../../utils/axiosClient'
import { KEY_ACCESS_TOKEN, setItem } from '../../utils/localStorageClient'
import './Login.scss'

function Login() {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axiosClient.post('auth/login',{
          email, 
          password
        });
        setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
        navigate('/')
        dispatch(showToast({
          type: TOAST_SUCCESS,
          message: 'Logged in successfully'
        }))
      } catch (error) {
       dispatch(showToast({
        type: TOAST_FAILURE,
        message: error
       })) 
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