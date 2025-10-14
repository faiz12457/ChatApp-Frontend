import React,{memo, useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import DeleteChat from "../models/DeleteChat";
import { AnimatePresence, useScroll } from "motion/react";

function ChatItem({
  handleDeleteChat,
  profile=null,
  name="Faiz",
  isOnline=true,
  _id = "232",
  groupChat = false,
  index,
  sameSender,
  newMessageAlert=true,
  id,setId
}) {
    const [position,setPosition]=useState({left:null,top:null})  
    const [visible,setVisble]=useState(false)

    function handleContextMenu(e,currId){
      e.preventDefault()
      setId(currId);
setPosition((prev) => ({ ...prev, left: e.clientX, top: e.clientY }));

//handleDeleteChat(e,_id,groupChat)

}
    

    
  return (
    <>
    <NavLink to={`/chat/${_id}`}>
      <div onClick={()=>setVisble(!visible)} onContextMenu={(e)=>handleContextMenu(e,_id)}
        className={`h-20 p-4 bg-amber-700  w-full  relative
     hover:bg-[#F7F7F7] transition-colors 
     cursor-pointer flex items-center gap-7 ${
       sameSender ? "bg-zinc-300 " : "bg-white"
     } `}
      >
        <img
          src={profile||'/favicon.svg'}
          className="size-12 rounded-full object-cover "
        />
        <div>
          <p className="text-xl mix-blend-difference font-medium text-white">
            {name}
          </p>

          {newMessageAlert && (
            <p className="text-xs text-zinc-600">+4 new Message</p>
          )}
        </div>
        {isOnline && (
          <span className="size-3 bg-green-800 rounded-full ml-auto"></span>
        )}

        
     <AnimatePresence>
        {id==_id && (
          <DeleteChat key="delete-chat" position={position} 
          handleDeleteChat={handleDeleteChat}
           id={_id}
           groupChat={groupChat} setId={setId} />
        )}
      </AnimatePresence>
      </div>

    </NavLink>


    </>
  );
}

export default memo(ChatItem);
