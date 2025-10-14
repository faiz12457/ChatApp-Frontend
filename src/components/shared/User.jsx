import { memo } from "react"
import { MdAdd } from "react-icons/md";
import { motion } from 'motion/react';
function User({user={},handler=()=>{},handleIsLoading}){
    const {_id,name,email}=user;
  return (
    <div className=' px-4 flex items-center gap-3 py-2  '>

     <img src='/favicon.svg' className='rounded-full object-cover size-10' />
     <div className="min-w-0 flex-1">
       <p className='text-base  font-medium truncate'>M Faiz Rizvi</p>
     <span className='text-xs text-gray-500 truncate'>faizrizvi45@gmail.com</span>
     </div>
    
    <motion.button 
     whileTap={{
      scale:0.9
     }}

     onClick={()=>handler(_id)}
     disabled={handleIsLoading}
    
    className='bg-[#1976D2] ml-auto size-9
    
     cursor-pointer rounded-full
      flex justify-center items-center text-white disabled:opacity-40 disabled:cursor-not-allowed'>
   <MdAdd size={22} />
    </motion.button>

    </div>

  )
}

export default memo(User);