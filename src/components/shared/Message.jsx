import React, { memo, useState } from "react";
import { lightBlue } from "../../constraints/colors";
import RenderAttachment from "./RenderAttachment";
import moment from "moment";
import {
  FaCheck,
  FaClock,
  FaExclamationCircle,
  FaEllipsisV,
} from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useOutsideClick } from "../../hooks/useOutsideClick";

function Message({ message, user, onDeleteForMe, onDeleteForEveryone }) {
  const formatted = moment(message.createdAt).format("h.mm A");
  const isSender = message?.sender._id ===user?._id;
  
  
  const [showMenu, setShowMenu] = useState(false);
  const ref=useOutsideClick(()=>setShowMenu(false))

  const icon = {
    failed: <FaExclamationCircle size={12} className="text-red-500" />,
    sent: <FaCheck size={12} className="text-green-500" />,
    sending: <FaClock size={12} className="text-gray-400" />,
  };

  return (
    <div
      className={`relative group bg-white 
       text-black rounded-[5px] p-2 w-fit max-w-[200px] md:max-w-[310px] 
      ${isSender ? "self-end" : "self-start"}`}
    >
      {/* Sender Name */}
      <p className="font-semibold" style={{ color: lightBlue }}>
        {isSender ? "You" : message?.sender?.userName}
      </p>

      {/* Attachments */}
      {message?.attachments?.length > 0 && (
        <div className="flex flex-col gap-1 mb-2">
          {message.attachments.map((p, i) => (
            <RenderAttachment key={i} url={p.url} ext={p.format} />
          ))}
        </div>
      )}

      {/* Message Text */}
      {message.deleteForEveryOne ? (
        <p className="italic text-gray-400 text-sm">This message was deleted</p>
      ) : (
        <p className="break-words">{message?.content}</p>
      )}

      {/* Time + Status */}
      <div className="flex justify-end items-center gap-2">
        <p className="text-zinc-400 text-xs mt-1">{formatted}</p>
        {isSender && <span>{icon[message?.status]}</span>}
      </div>

      {/* Three-dot icon */}
      {
    !message.deleteForEveryOne && <div
        className={`absolute top-1/2 -translate-y-1/2
    ${isSender ? "-left-8" : "-right-8"}
    opacity-0 group-hover:opacity-100 transition-opacity
    flex items-center justify-center w-[26px] h-[26px]
    bg-white rounded-full shadow cursor-pointer`}
        onClick={() => setShowMenu((prev) => !prev)}
      >
        <IoIosArrowDown
          size={16}
          className={`text-gray-600 transition-transform duration-200 `}
        />
      </div>
      }
      <AnimatePresence>
        {/* Dropdown menu */}
        {showMenu && !message.deleteForEveryOne && (
          <motion.div
          ref={ref}
            initial={{
              y: -15,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              ease: "backOut",
            }}
            className={`absolute bg-white shadow-lg   rounded-md text-sm z-10
          ${isSender ? "-left-28 top-6" : "-right-28 top-6"}`}
          >
            <button
              onClick={() => {
                 onDeleteForMe(message._id);
                setShowMenu(false);
              }}
              className=" w-full flex gap-1 items-center text-left
           px-3 py-1 cursor-pointer hover:bg-gray-100"
            >
              <RiDeleteBin6Line size={16} />{isSender?  "Delete for Me":"Delete Message"}
            </button>
            {isSender && (
              <button
                onClick={() => {
                    onDeleteForEveryone(message._id);
                  setShowMenu(false);
                }}
                className=" w-full text-left px-3 flex items-center gap-1 py-1 cursor-pointer  hover:bg-gray-100"
              >
                <RiDeleteBin6Line size={16} className="text-red-500" /> Delete
                for Everyone
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default memo(Message);
