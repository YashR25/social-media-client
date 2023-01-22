import React from 'react'
import Avatar from '../avatar/Avatar'
import './Post.scss'
import bgImage from '../../assets/background.jpg'
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import {useDispatch, useSelector} from 'react-redux'
import { likeAndUnlikePost } from '../../redux/slices/postSlice'
import {useNavigate} from 'react-router-dom'
import { showToast } from '../../redux/slices/appConfigSlice'
import { TOAST_SUCCESS } from '../../App'

function Post({post}) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLike = () => {
    dispatch(showToast({
      type: TOAST_SUCCESS,
      message: 'like or unlike',
    }))
    dispatch(likeAndUnlikePost({
      postId: post._id
    }))
  }

  return (
    <div className='Post'>
        <div className="heading" onClick={() => navigate(`/profile/${post?.owner?._id}`)}>
            <Avatar src={post?.owner?.avatar?.url} />
            {console.log(post)}
            <h4>{post?.owner?.name}</h4>
        </div>
        <div className="content">
            <img src={post?.image?.url} alt="" />
        </div>
        <div className="footer">
          <div className="like" onClick={handleLike}>
            {post.isLiked ? <AiFillHeart className='icon-fill'/> : <AiOutlineHeart className='icon'/>}
            <h4>{`${post?.likesCount} Likes`}</h4>
          </div>
          <div className="caption">{post?.caption}</div>
          <h6 className='time-ago'>{post?.timeAgo}</h6>
        </div>
    </div>
  )
}

export default Post