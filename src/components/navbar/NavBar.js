import axios from 'axios';
import React, { useRef, useState } from 'react'
import { AiOutlineLogout } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { TOAST_FAILURE, TOAST_SUCCESS } from '../../App';
import { setLoading, showToast } from '../../redux/slices/appConfigSlice';
import { axiosClient } from '../../utils/axiosClient';
import { KEY_ACCESS_TOKEN, removeItem } from '../../utils/localStorageClient';
import Avatar from '../avatar/Avatar'
import './NavBar.scss'


function NavBar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    function toggleLoadingBar() {
        dispatch(setLoading(true))
    }

    const myProfile = useSelector((state) => state.appConfigReducer.myProfile)

    const handleLogout = async () => {
        try {
            dispatch(setLoading(true))
            await axiosClient.post('/auth/logout')
            removeItem(KEY_ACCESS_TOKEN)
            navigate('/login')
            dispatch(setLoading(false))
        } catch (error) {
            dispatch(showToast({
                type: TOAST_FAILURE,
                message: error
            }))    
        }finally{
            dispatch(showToast({
                type: TOAST_SUCCESS,
                message: 'Logged out Successfully'
            }))
        }
    }

  return (
    <div className='Navbar'>
        <div className="container">
            <h2 className='banner hover-link' onClick={() => navigate('/')}>Social Media</h2>
            <div className="right-side">
                <div className="profile hover-link" onClick={() => navigate(`/profile/${myProfile?._id}`)}>
                    <Avatar src={myProfile?.avatar?.url}/>
                </div>
                <div className="logout hover-link" onClick={handleLogout}>
                    <AiOutlineLogout className='icon' onClick={toggleLoadingBar}/>
                </div>
            </div>
        </div>

    </div>
  )
}

export default NavBar