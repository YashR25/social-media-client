import React, { useState } from 'react'
import Avatar from '../avatar/Avatar'
import {BsCardImage} from 'react-icons/bs'
import './CreatePost.scss'
import { axiosClient } from '../../utils/axiosClient'
import {useDispatch, useSelector} from 'react-redux'
import { setLoading, showToast } from '../../redux/slices/appConfigSlice'
import {getUserProfile} from '../../redux/slices/postSlice'
import { useNavigate } from 'react-router-dom'
import { TOAST_FAILURE, TOAST_SUCCESS } from '../../App'

function CreatePost({post}) {

    const [postImg, setPostImg] = useState('')
    const [caption, setCaption] = useState('')
    const dispatch = useDispatch()
    const myProfile = useSelector((state) => state.appConfigReducer.myProfile)
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
        if(fileReader.readyState === fileReader.DONE){
            setPostImg(fileReader.result)
        }
        }
    }

    const handlePostSubmit = async () => {
        try {
            dispatch(setLoading(true))
            const response = await axiosClient.post('/posts/', {
                caption,
                postImg
            })
            dispatch(showToast({
                type: TOAST_SUCCESS,
                message: 'Post created successfully'
            }))
            dispatch(getUserProfile({
                userId: myProfile._id
            }))
        } catch (error) {
            dispatch(showToast({
                type: TOAST_FAILURE,
                message: error
            }))
        }finally{
            dispatch(setLoading(false))
            setCaption('')
            setPostImg('')
        }
        
    }
  return (
    <div className='CreatePost'>
        <div className="left-part-post" onClick={() => navigate(`/profile/${myProfile._id}`)}>
            <Avatar src={post?.avatar?.url} />
        </div>
        <div className="right-part-post">
            <input value={caption} type="text" className='captionInput' placeholder="What's in your mind"
            onChange={(e) => setCaption(e.target.value)}/>
            {postImg && 
            <div className="img-container">
                <img className='post-img' src={postImg} alt="Post Image" />
            </div>
            }
            <div className="bottom-part">
            <div className="input-post-img">
                <label htmlFor="inputImg" className='labelImg'>
                <BsCardImage /> 
            </label>
            <input id='inputImg' className='inputImg' type='file' accept='image/*' onChange={handleImageChange} />
            </div>
            <button className='post-btn btn-primary' onClick={handlePostSubmit}>Post</button>
        </div>
        </div>
    </div>
  )
}

export default CreatePost