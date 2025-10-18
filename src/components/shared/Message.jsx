import React, { memo } from 'react'
import { lightBlue } from '../../constraints/colors';
import RenderAttachment from './RenderAttachment';
import moment from "moment";

function Message({message,user,id}) {
    const date = "2025-07-24T12:27:43.428+00:00";
const formatted = moment(date).fromNow();


  return (
    <div className={`bg-white text-black  rounded-[5px] 
    p-2 w-fit max-w-[200px]  md:max-w-[290px] ${id%2==0?"self-start":"self-end"}`}>

          {/* <a>

             <RenderAttachment />
          </a> */}
        <p className='font-semibold' style={{color:lightBlue}}>Faiz</p>

        <p className='break-words'>{message}</p>

        <p className='text-zinc-400 text-xs mt-1'>{formatted}</p>

    </div>
  )
}

export default memo(Message);