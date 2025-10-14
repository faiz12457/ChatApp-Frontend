import React, { memo } from 'react'

function Request() {
  return (
    <div className='max-w-[340px]  flex items-center gap-2'>

    <div className='size-8 bg-black   rounded-full'> </div>

      <div className='min-w-0 flex-1'>
    <p className='truncate '>Muhammad Faiz Rizvi</p>
    </div>
     <RequestBtn />
     <RequestBtn title='Reject' color='#D32F2F' />
   

    </div>
  )
}

export default Request


function RequestBtn({title="Accept",color='#1976D2',handler=()=>{}}){
    return (
        <button onClick={handler} className='font-medium uppercase text-base transition-colors hover:bg-zinc-200 cursor-pointer rounded  p-2 flex justify-center items-center' style={{color}}>
            {title}
        </button>
    )
}