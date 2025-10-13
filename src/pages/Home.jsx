import React from 'react'
import LogoutButton from '../components/auth/LogoutButton'
import { AppLayout } from '../components/HOC/appLayout'

function Home({socket}) {
  return (
    <div>

    Home
    {/* <LogoutButton /> */}
    </div>

  )
}

export default AppLayout()(Home)

