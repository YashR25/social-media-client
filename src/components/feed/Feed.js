import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFeedData } from '../../redux/slices/feedSlice'
import CreatePost from '../createPost/CreatePost'
import Follower from '../follower/Follower'
import Post from '../post/Post'
import './Feed.scss'

function Feed() {

  const dispatch = useDispatch();

  const feedData = useSelector((state) => state.feedReducer.feedData)
  useEffect(() => {
    dispatch(getFeedData())
  },[dispatch])
  return (
    <div className='Feed'>
      <div className="container">
        <div className="left-part">
          <CreatePost post={feedData} />
          {feedData?.posts?.map(post => <Post key={post._id} post={post} />)}
        </div>
        <div className="right-part">
          <div className="following">
            <h3 className='title'>You are following</h3>
            {feedData?.following?.map(user => <Follower key={user?._id} user={user}/>)}
          </div>
          <div className="suggetions">
            <h3 className='title'>Suggested For you</h3>
            {feedData?.suggetions?.map(user => <Follower key={user?._id} user={user}/>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feed