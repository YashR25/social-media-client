import React from 'react'
import userImg from '../../assets/user.png'
import './Avatar.scss'

function Avatar({src}) {
  return (
    <div className='Avatar'>
        <img src={src ? src : userImg} alt='User Image' />
    </div>
  )
}

export default Avatar