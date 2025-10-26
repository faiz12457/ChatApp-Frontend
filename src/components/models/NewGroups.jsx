import React from 'react'
import User from '../shared/User'
import { IoSearchOutline } from "react-icons/io5";
import { motion } from 'motion/react';
import { useQuery } from '@tanstack/react-query';
import api from '../../api';

function NewGroups() {

   

    const {data,isLoading}=useQuery({
       queryKey:['friends'],
       queryFn:async()=>{
            const res=await api.get("/user/getFriends");
            return res.data
       }
      })

  return (
      <div className=' min-w-[320px] max-w-[350px] p-8 rounded  bg-white      space-y-4'> 
          <p className='text-black text-center text-xl'>New Group</p>
    
          <div className='w-full h-10 focus-within:border-blue-500 flex gap-2 px-2 justify-center items-center border rounded border-gray-300'>
          
    
            <input type="text" placeholder='Group Name' className='w-full outline-none  h-full' />
            
          </div>
    
           <p className='font-medium'>Members</p>
            <div className='space-y-2 max-h-[300px]  overflow-y-auto'>
            {
             data?.friends?.map((user)=>   <User key={user._id} user={user} />)
            }
           
              
            </div>

            <div className='flex w-full justify-between'>
              <motion.button 
               whileTap={{scale:0.9}}
              className='uppercase py-2 px-6 
              bg-[#1976D2] rounded text-white cursor-pointer'>Create</motion.button>
            </div>
        </div>
      
  )
}

export default NewGroups