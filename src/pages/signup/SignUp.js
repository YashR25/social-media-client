import React from 'react'
import './SignUp.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { axiosClient } from '../../utils/axiosClient'
import { showToast } from '../../redux/slices/appConfigSlice'
import { TOAST_FAILURE, TOAST_SUCCESS } from '../../App'
import { useDispatch } from 'react-redux'

function SignUp() {

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const result = await axiosClient.post('auth/signup',{
          name,
          email, 
          password
        });
        dispatch(showToast({
          type: TOAST_SUCCESS,
          message: 'Signed up Successfully'
        }))
      } catch (error) {
        dispatch(showToast({
          type: TOAST_FAILURE,
          message:error
        }))
      }
      
  }
  return (
    <div className='Signup'>
      <div className='Signup-Box'>
        <h2 className='heading'>Signup</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='name'>Name</label>
          <input type='text' id='name' className='name' onChange={(e) => setName(e.target.value)}></input>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' className='email' onChange={(e) => setEmail(e.target.value)}></input>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' className='password' onChange={(e) => setPassword(e.target.value)}></input>
          <input type='submit' className='submit' id='submit' onClick={handleSubmit}></input>
        </form>
        <p className='subheading'>Already have an account? <Link to='/login'>Login</Link></p>
      </div>
    </div>
  )
}

export default SignUp