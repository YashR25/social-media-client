import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { TOAST_FAILURE, TOAST_SUCCESS } from '../../App'
import userImg from '../../assets/user.png'
import { setLoading, showToast, updateMyProfile } from '../../redux/slices/appConfigSlice'
import { axiosClient } from '../../utils/axiosClient'
import { KEY_ACCESS_TOKEN, removeItem } from '../../utils/localStorageClient'
import './UpdateProfile.scss'

function UpdateProfile() {

  const myProfile = useSelector((state) => state.appConfigReducer.myProfile)
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [avatar, setAvatar] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setName(myProfile?.name || '')
    setBio(myProfile?.bio || '')
    setAvatar(myProfile?.avatar?.url || '')
  }, [myProfile])

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      if(fileReader.readyState === fileReader.DONE){
        setAvatar(fileReader.result)
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateMyProfile({
      name, 
      bio,
      userImg: avatar
    }))
  }

  const handleDelete = async (e) => {
    try {
      dispatch(setLoading(true))
      await axiosClient.delete('/user/')
      removeItem(KEY_ACCESS_TOKEN)
      navigate('/login')
      dispatch(setLoading(false))
      dispatch(showToast({
        type: TOAST_SUCCESS,
        message: 'Successfully deleted profile'
      }))
  } catch (error) {
      dispatch(showToast({
          type: TOAST_FAILURE,
          message: error
      }))    
  }
  }
  return (
    <div className='UpdateProfile'>
      <div className="container">
        <div className="left-part">
          <div className="input-user-img">
            <label htmlFor="inputImg" className='labelImg'>
              <img src={avatar} alt={name} />
            </label>
            <input id='inputImg' type='file' className='inputImg' accept='image/*' onChange={handleImageChange}/>
          </div>
        </div>
        <div className="right-part">
          <form onSubmit={handleSubmit}>
            <input value={name} type="text" placeholder='Your Name' onChange={(e) => setName(e.target.value)} />
            <input value={bio} type="text" placeholder='Your bio' onChange={(e) => setBio(e.target.value)}/>
            <input type="submit" className='btn-primary' onClick={handleSubmit}/>
          </form>

          <button className='delete-account btn-primary' onClick={handleDelete}>Delete Account</button>
        </div>
      </div>
    </div>
  )
}

export default UpdateProfile