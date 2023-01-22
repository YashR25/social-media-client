import React, { useEffect, useState } from 'react'
import './Profile.scss'
import Post from '../post/Post'
import userImg from '../../assets/user.png'
import { useNavigate, useParams } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { getUserProfile } from '../../redux/slices/postSlice'
import CreatePost from '../createPost/CreatePost'
import { followAndUnfollowUser } from '../../redux/slices/feedSlice'



function Profile() {

  const navigate = useNavigate();
  const params = useParams();
  const userProfile = useSelector((state) => state.postReducer.userProfile)
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile)
  const dispatch = useDispatch();

  const [isMyProfile, setIsMyProfile] = useState(false)
  const feedData = useSelector((state) => state.feedReducer.feedData)
  const [isFollowing, setIsFollowing] = useState('')

  useEffect(() => {
    dispatch(getUserProfile({
      userId: params.userId
    }))
  }, [])

  useEffect(() => {
    setIsMyProfile(userProfile._id === myProfile._id)
    setIsFollowing(feedData.following.find(item => item._id == userProfile._id))
  }, [feedData, userProfile])

  const handleFollow = () => {
    dispatch(followAndUnfollowUser({
      userIdToFollow: userProfile._id
    }))
  }

  return (
    <div className='Profile'>
      <div className="container">
        <div className="left-part">
          {isMyProfile && <CreatePost post={myProfile} />}
          {userProfile?.posts?.map((post) => {
            return <Post post={post} />
          })}
        </div>
        <div className="right-part">
          <div className="profile-card">
            <img className='user-img' src={userProfile?.avatar?.url ? userProfile?.avatar?.url : userImg} alt="user profile image" />
            <h3 className='user-name'>{userProfile?.name}</h3>
            <div className="follower-info">
              <h4>{userProfile?.followers?.length} Followers</h4>
              <h4>{userProfile?.following?.length} Following</h4>
            </div>
            {!isMyProfile && <button onClick={handleFollow} className={isFollowing ? 'follow' : 'btn-primary' }>{isFollowing ? 'unFollow' : 'Follow'}</button>}
            {isMyProfile && <button className='update-profile btn-secondary' onClick={() => navigate('/updateProfile')}>Update Profile</button>}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Profile