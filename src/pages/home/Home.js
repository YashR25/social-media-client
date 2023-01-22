import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import NavBar from '../../components/navbar/NavBar'
import { getMyInfo, setLoading } from '../../redux/slices/appConfigSlice'
import { axiosClient } from '../../utils/axiosClient'

function Home() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyInfo())
  }, [])

  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  )
}

export default Home