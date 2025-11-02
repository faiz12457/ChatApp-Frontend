import React,{memo, useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import DeleteChat from "../models/DeleteChat";
import { AnimatePresence, useScroll } from "motion/react";
import { useSelector } from "react-redux";
import { selectLoginUser } from "../../redux/slices/auth/authSlice";

function ChatItem({
  handleDeleteChat,
  isOnline=true,
  _id = "232",
  groupChat = false,
  index,
  sameSender,
  newMessageAlert=true,
  id,setId,
  selected,setSelected,
  data
}) {
   
  const user=useSelector(selectLoginUser)
 const friend= data.participants.find(p => p._id !== user._id);


    function handleContextMenu(e,currId){
      e.preventDefault()
      setId(currId);
          setSelected(currId)

//handleDeleteChat(e,_id,groupChat)

}
    

    
  return (
    <>
    <NavLink to={`/chat/${data?._id}`} state={{participants:data.participants}}>
      <div onClick={()=>setSelected(_id)} onContextMenu={(e)=>handleContextMenu(e,_id)}
        className={`h-20  p-4 bg-amber-700  w-full  relative
      transition-colors  duration-150
     cursor-pointer flex items-center gap-7 ${
       selected==_id ? "bg-zinc-200 " : "bg-zinc-50"
     } `}
      >

        <img
          src={data.IsGroupChat? data.groupChatPic|| "/favicon.svg" :friend?.profilePic?.url||'/favicon.svg'}
          className="size-12 rounded-full object-cover "
        />
        <div>
          <p className="text-xl mix-blend-difference font-medium text-white">
            {data.IsGroupChat?data.name:friend.userName}
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
          <DeleteChat key="delete-chat" 
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
