import React from 'react'
import { IoSearchOutline } from "react-icons/io5";

import User from '../shared/User';
function Search() {
  return (
    <div className='w-96 p-8 rounded  bg-white      space-y-4'> 
      <p className='text-black text-center text-xl'>Find People</p>

      <div className='w-full h-10 focus-within:border-blue-500 flex gap-2 px-2 justify-center items-center border rounded border-gray-300'>
        <IoSearchOutline size={22} />

        <input type="text" className='w-full outline-none  h-full' />
        
      </div>


        <div className='space-y-2 h-[350px]  overflow-y-auto'>
        {
          Array.from({length:10}).map(()=>   <User />)
        }
       
          
        </div>
    </div>
  )
}

export default Search


