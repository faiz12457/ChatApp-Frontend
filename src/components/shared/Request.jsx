import React, { memo } from 'react'

function Request({request,handler}) {
  
  return (
    <div className='max-w-[340px]  flex items-center gap-2'>

    <div className='size-8 bg-black   rounded-full'> </div>

      <div className='min-w-0 flex flex-1 '>
    <p className='truncate self-start text-xl '>{request.sender.name}</p>
    </div>
     <RequestBtn handler={handler} id={request._id}  />
     <RequestBtn title='Reject' color='#D32F2F' handler={handler} id={request._id} />
   

    </div>
  )
}

export default Request


function RequestBtn({title="Accept",color='#1976D2',handler=()=>{},id}){
    return (
        <button onClick={()=>handler({requestId:id,accept: title==='Accept'? true: false})} className='font-medium uppercase text-base transition-colors hover:bg-zinc-200 cursor-pointer rounded  p-2 flex justify-center items-center' style={{color}}>
            {title}
        </button>
    )
}