import React from 'react'
import { FaAt } from "react-icons/fa6";
import { CgGirl } from "react-icons/cg";
import { FaRegCalendarAlt } from "react-icons/fa";
function UserProfile({user}) {

  return (
    
            <div className="h-full  box-border  justify-center bg-[rgba(0,0,0,0.85)] p-8 hidden md:flex">

             <div className='flex h-full flex-col items-center gap-5' >
                <img src={user?.profilePic?.url || "/favicon.svg"} alt='profilePic' className="size-48 border-4 p-1 border-white rounded-full object-cover" />

                <div className="text-white text-base  text-center">
                    <p>{user?.bio}</p>
                    <span className="text-[#808080] text-xs">Bio</span>
                </div>


                <UserInfo title={'UserName'} name={user?.userName} icon={<FaAt size={22} />}  />
                <UserInfo title={'Email'} name={user?.email} icon={<CgGirl size={23} />} />
                <UserInfo title={"Joined"} name={'2 hours ago'} icon={<FaRegCalendarAlt size={22} />} />
             </div>                   

            </div>

  )
}

export default UserProfile


function UserInfo({name,icon,title}){

    return  <div className="flex items-center gap-5 w-fit  text-white">
               {icon}
                  
                  <div className='text-center'>
                    <p className='text-white text-base'>{name}</p>
                      <span className="text-[#808080] text-xs">{title}</span>
                  </div>
                </div>

}