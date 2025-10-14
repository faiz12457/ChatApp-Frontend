import React, { useState } from 'react'
import { orange } from '../../constraints/colors'
import { IoMdMenu } from "react-icons/io";
import IconContainer from '../shared/IconContainer';
import { IoIosSearch } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6";
import { FaBell } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { useLogout } from '../../hooks/useLogout';
import { useNavigate } from 'react-router-dom';
import Model from '../models/Model';
import Search from '../models/Search';
import Notifications from '../models/Notifications';
import NewGroups from '../models/NewGroups';
function Header() {
  const naivgate=useNavigate();

  const [search,setSearch]=useState(false)
  const [newGroup,setNewGroup]=useState(false)
  const [notification,setNotification]=useState(false)
      
    const {logout}=useLogout();


    function openSearchPortal(){
      console.log('open search portal')
      setSearch((prev)=>!prev);
    }

    function openNewGroup(){
      console.log('new Group')
      setNewGroup((prev)=>!prev)
    }

    function openNotifications(){
      console.log('open notifications')
      setNotification((prev)=>!prev)
    }

    function navigateToGroup(){
      naivgate("/groups")

    }
  return (
    <div
     style={{backgroundColor:orange}}
     className=' flex px-3  text-white items-center  flex-grow  h-16 '>

    <div className=''>
        <p className='hidden sm:block font-bold text-xl'>Quick Chat</p>
    </div>    

    <div className='block  sm:hidden cursor-pointer'>
       <IoMdMenu className='text-white ' size={23} />
    </div>


    <div className='flex gap-2 ml-auto'>
        <IconContainer icon={<IoIosSearch size={20} />} title={'Search'} handler={openSearchPortal} />
        <IconContainer icon={<IoMdAdd size={20} />} title={'New Group'} handler={openNewGroup} />
        <IconContainer icon={<FaUserGroup size={20} />} title={'Manage Group'} handler={navigateToGroup} />
        <IconContainer icon={<FaBell size={20} />} title={'Notifications'} handler={openNotifications}>
          <span className='rounded-full p-1 inline-flex justify-center text-xs font-medium items-center
           bg-red-700 text-white absolute z-20 size-6 -top-1.5 -right-1'>0</span>
        </IconContainer>
        <IconContainer icon={<MdOutlineLogout size={20} />} handler={logout} title={'Logout'} />
    </div>

    
      <Model isOpen={search} onClose={()=>setSearch(false)}>
           <Search />
      </Model>

      <Model isOpen={notification} onClose={()=>setNotification(false)}>
          <Notifications />
      </Model>

      <Model isOpen={newGroup} onClose={()=>setNewGroup(false)}>
      <NewGroups />
      </Model>
    
    </div>
  )
}

export default Header