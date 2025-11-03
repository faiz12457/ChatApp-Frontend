import React, { memo, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import DeleteChat from "../models/DeleteChat";
import { AnimatePresence, useScroll } from "motion/react";
import { useSelector } from "react-redux";
import { selectLoginUser } from "../../redux/slices/auth/authSlice";

function ChatItem({
  isOnline = false,
  _id = "232",
  groupChat = false,
  index,
  sameSender,
  selected,
  setSelected,
  data,
  openChat,
  activeModel,
  setActiveModel
}) {
  const user = useSelector(selectLoginUser);
  const friend = data?.participants?.find((p) => p._id !== user._id);
  const itemRef=useRef(null);

  function handleContextMenu(e, currId) {
    e.preventDefault();
  
    setSelected(currId);
   
      setActiveModel((prev) =>
      prev.open && prev.chat?._id === data?._id
        ? { open: false, anchorRef: null, chat: null }
        : { open: true, anchorRef:itemRef, chat:data }
    );
  }

  return (
    <>
      <NavLink
        to={`/chat/${data?._id}`}
        state={{ participants: data?.participants }}
      >
        <div
        ref={itemRef}
          onClick={() => openChat(data._id)}
          onContextMenu={(e) => handleContextMenu(e, _id)}
          className={`h-20  p-4 bg-amber-700  w-full  relative
      transition-colors  duration-150
     cursor-pointer flex items-center gap-7 ${
       selected == _id ? "bg-zinc-200 " : "bg-zinc-50"
     } `}
        >
          <img
            src={
              data?.IsGroupChat
                ? data?.groupChatPic || "/favicon.svg"
                : friend?.profilePic?.url || "/favicon.svg"
            }
            className="size-12 rounded-full object-cover "
          />
          <div>
            <p className="text-xl mix-blend-difference font-medium text-white">
              {data?.IsGroupChat ? data?.name : friend?.userName}
            </p>

            {data.unreadCount > 0 && (
              <p className="text-xs text-zinc-600">
                {" "}
                {data?.unreadCount > 4
                  ? data?.unreadCount - 1 + "+ new messages"
                  : data?.unreadCount && data?.unreadCount + " new message"}
              </p>
            )}
          </div>
          {isOnline && (
            <span className="size-3 bg-green-800 rounded-full ml-auto"></span>
          )}
        </div>
      </NavLink>
    </>
  );
}

export default memo(ChatItem);
