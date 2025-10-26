import { memo } from "react"
import { MdAdd } from "react-icons/md";
import { motion } from 'motion/react';
import { FiMinus } from "react-icons/fi";
function User({user={},handler=()=>{},handleIsLoading,isAdded=false}){
      const {_id,userName,email,profilePic}=user;
  return (
    <div className=' px-4 flex items-center gap-3 py-2  '>

     <img src={profilePic?.url||'/favicon.svg'} loading="lazy" className='rounded-full object-cover size-10' />
     <div className="min-w-0 flex-1">
       <p className='text-base  font-medium truncate'>{userName}</p>
     <span className='text-xs text-gray-500 truncate'>{email}</span>
     </div>
    
    <motion.button 
     whileTap={{
      scale:0.9
     }}

     onClick={()=>handler(_id)}
     disabled={handleIsLoading}
    
    className={` ml-auto size-9
    
     cursor-pointer rounded-full
      flex justify-center items-center text-white disabled:opacity-40 disabled:cursor-not-allowed
       ${!isAdded?"bg-[#1976D2]":"bg-[#D32F2F]"}`}>
      {isAdded?<FiMinus size={22} /> :  <MdAdd size={22} />}
 
    </motion.button>

    </div>

  )
}

export default memo(User);