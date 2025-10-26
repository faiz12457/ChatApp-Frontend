import React from 'react'
import LogoutButton from '../components/auth/LogoutButton'
import { AppLayout } from '../components/HOC/appLayout'
import { grey } from '../constraints/colors'

function Home() {
  return (
    <div className='h-full w-full 
    '  style={{backgroundColor:grey}}>

    <p className='p-8 font-medium text-2xl text-black text-center'>Select a friend to chat</p>  
    </div>

  )
}

export default AppLayout()(Home)

