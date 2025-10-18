import React from 'react'
import { AdminLayout } from '../../components/HOC/AdminLayout'

function AdminDashboard() {
  return (
    <div>AdminDashboard</div>
  )
}

export default AdminLayout()(AdminDashboard)