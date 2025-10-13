import React, { useState } from 'react'

import { motion } from 'motion/react'
function IconContainer({icon,title,handler}) {
    const [visible,setVisible]=useState(false)
  return (
    <div onClick={handler} onMouseEnter={()=>setVisible(true)}  onMouseLeave={()=>setVisible(false)} className='size-10
     rounded-full cursor-pointer relative
      hover:bg-zinc-400/45 transition-colors
       text-white flex justify-center items-center'>{icon}

      {visible&&  <motion.span 
        initial={{y:-5, opacity:0, scale:0}}
        animate={{y:0, opacity:1,scale:1}}
        transition={{duration:0.25,ease:"easeInOut"}}
         className='absolute -bottom-8 bg-[#595959]
         text-white text-xs px-2 py-1 rounded w-fit block text-nowrap'>{title}</motion.span>}
       </div>
  )
}

export default IconContainer