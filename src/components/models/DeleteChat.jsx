import React from "react";
import { createPortal } from "react-dom";
import { MdDelete } from "react-icons/md";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
function DeleteChat({id,groupChat,handleDeleteChat,setId}) {

  const ref=useOutsideClick(()=>{setId(false)});

  return (
   
    <motion.div
    ref={ref}
    onClick={()=>{
      setId(null)
      handleDeleteChat(id,groupChat) 
    }}
     initial={{scale:0.8,opacity:0}}
     animate={{scale:1,opacity:1}}

     exit={{opacity:0, scale:0.8}}
     
  
    
     className="p-2 absolute z-20  flex items-center gap-2 -right-20 -bottom-5  bg-white shadow w-[160px]">
      <MdDelete size={23} /> <span>DeleteChat</span>
    </motion.div>
    
  );
}

export default DeleteChat;
