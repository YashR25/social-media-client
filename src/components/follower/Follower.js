import React, { useEffect, useState } from 'react'
import Avatar from '../avatar/Avatar'
import './Follower.scss'
import {useDispatch, useSelector} from 'react-redux'
import { followAndUnfollowUser } from '../../redux/slices/feedSlice'
import { useNavigate } from 'react-router-dom'

function Follower({user}) {

  const feedData = useSelector((state) => state.feedReducer.feedData)
  const [isFollowing, setIsFollowing] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
      setIsFollowing(feedData.following.find(item => item._id === user._id))
  }, [feedData])

  const handleFollow = () => {
    dispatch(followAndUnfollowUser({
      userIdToFollow: user._id
    }))
  }

  return (
    <div className='Follower'>
        <div className="user-info" onClick={() => navigate(`/profile/${user._id}`)}>
            <Avatar src={user?.avatar?.url}/>
            <h4 className='name'>{user?.name}</h4>
        </div>
        <h5 className={isFollowing ? 'hover-link follow-link' : 'btn-primary' } onClick={handleFollow}>{isFollowing ? 'UnFollow' : 'Follow'}</h5>

    </div>
  )
}

export default Follower