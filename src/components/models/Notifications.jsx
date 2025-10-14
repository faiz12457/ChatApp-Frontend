import React from 'react'
import Request from '../shared/Request'

function Notifications() {
  return (
    <div className=' rounded min-h-40 max-h-[300px] p-8 bg-white space-y-2'>
      <p className='text-xl text-black font-medium text-center'>Notifications </p>
       <div className='overflow-y-auto space-y-2 py-2 max-h-[200px] '>
      <Request />
      
       
      </div>
    </div>
  )
}

export default Notifications