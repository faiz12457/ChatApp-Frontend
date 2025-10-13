import React from 'react'
import { orange } from '../../constraints/colors'
import { IoMdMenu } from "react-icons/io";
import IconContainer from '../shared/IconContainer';
import { IoIosSearch } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6";
import { FaBell } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { useLogout } from '../../hooks/useLogout';
function Header() {
    const {logout}=useLogout();
  return (
    <div
     style={{backgroundColor:orange}}
     className=' flex justify-between px-3 text-white items-center flex-grow  h-16 '>

    <div className=''>
        <p className='hidden sm:block font-bold text-xl'>Quick Chat</p>
    </div>    

    <div className='block sm:hidden cursor-pointer'>
       <IoMdMenu className='text-white ' size={23} />
    </div>


    <div className='flex gap-2'>
        <IconContainer icon={<IoIosSearch size={20} />} title={'Search'} />
        <IconContainer icon={<IoMdAdd size={20} />} title={'New Group'} />
        <IconContainer icon={<FaUserGroup size={20} />} title={'Manage Group'} />
        <IconContainer icon={<FaBell size={20} />} title={'Notifications'} />
        <IconContainer icon={<MdOutlineLogout size={20} />} handler={logout} title={'Logout'} />
    </div>
    </div>
  )
}

export default Header