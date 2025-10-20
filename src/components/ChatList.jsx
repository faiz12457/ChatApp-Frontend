import React, { useState } from "react";
import ChatItem from "./shared/ChatItem";
function ChatList({
  chats = [1,2,4,5,6],
  chatId,
  onlineUsers = [],
  newMessageAlert = [{ chatId: "", count: 0 }],
  handleDeleteChat
}
) {

  const [id,setId]=useState(null);
  const [selected,setSelected]=useState(null);
  return <div className="w-full divide-y divide-gray-300 bg-amber-300 flex flex-col">

    {
        chats?.map((data,index)=>{
        
             return (
                <ChatItem  selected={selected} setSelected={setSelected} setId={setId} id={id} _id={data}  handleDeleteChat={handleDeleteChat} index={index} />
             )
        })
    }
  </div>;
}
export default ChatList;
