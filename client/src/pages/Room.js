import React, {useEffect} from 'react'
import axios from 'axios'

const Room = () => {
  useEffect(() => {
    axios(
      {
        method: 'GET',
        url: 'http://localhost:3050/api/user/test',
        withCredentials: true,
        headers: {'Content-Type': 'application/json' }
      }
    )
      .then(response => {
        console.log(response)
      })
  }, [])

  return (
    <div>
      
    </div>
  )
}

export default Room
