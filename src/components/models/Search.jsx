import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";

import User from '../shared/User';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../../api';
import UserSkeleton from '../shared/UserSkeleton';
import { useSocket } from '../../context/socketContext';
import { NEW_NOTIFICATION } from '../../event';
function Search() {
 const [users,setUsers]=useState([]);
  const [name,setName]=useState("");
  const {data,isLoading}=useQuery({
   queryKey:['people'],
   queryFn:async()=>{
        const res=await api.get("/user/search");
        return res.data
   }
  })

 
  const socket=useSocket();
  useEffect(()=>{
    if(data) setUsers(data.users)

  },[data])


  const addFriendMutation=useMutation({
    mutationFn:async(id)=>{
      const res=await api.post("/user/sendRequest",{userId:id});
      return res.data
    },

    onSuccess:({request},{id})=>{

        socket.emit(NEW_NOTIFICATION,{request,id})   
 
    }
  })


async  function addFriend(id){
    

      addFriendMutation.mutate(id);
  }

  return (
    <div className='w-96 p-8 rounded  bg-white      space-y-4'> 
      <p className='text-black text-center text-xl'>Find People</p>

      <div className='w-full h-10 focus-within:border-blue-500 flex gap-2 px-2 justify-center items-center border rounded border-gray-300'>
        <IoSearchOutline size={22} />

        <input type="text" className='w-full outline-none  h-full' />
        
      </div>


        <div className='space-y-2 h-[350px]  overflow-y-auto'>

        {
          isLoading? Array.from({length:3}).map((_,i)=> <UserSkeleton key={i} />):
          users?.map((user)=>   <User user={user} key={user._id} handler={addFriend} />)
        }
       
          
        </div>
    </div>
  )
}

export default Search


