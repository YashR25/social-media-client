import React from 'react'
import { useEffect } from 'react'
import { axiosClient } from '../../utils/axiosClient'

function Home() {

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
      try {
        const response = await axiosClient.get('/posts/all');
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div>Home</div>
  )
}

export default Home