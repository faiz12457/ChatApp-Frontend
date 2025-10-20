import React, { useEffect, useRef, useState } from "react";
import { AppLayout } from "../components/HOC/appLayout";
import { rgbGrey } from "../constraints/colors";
import { MdAttachFile } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import UploadMenu from "../components/shared/UploadMenu";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { AnimatePresence } from "motion/react";
import Message from "../components/shared/Message";

function Chat() {
  const [menu, showMenu] = useState(false);
  const [chats,setChats]=useState(['hello','hi, there']);
  const [message,setMessage]=useState("");
  function handleSubmit(e) {
    e.preventDefault();
    
    console.log('Submitted')
    setChats((prev)=>[...prev,message]);
    setMessage("");
  }

  const ref = useOutsideClick(() => showMenu(false));
    const bottomRef = useRef(null);
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);

  return (
    <>
      <div
        style={{ backgroundColor: rgbGrey }}
        className="flex   bg-b h-[calc(100%-60px)]  "
      >
        <div className="p-2 h-[480px] flex   overflow-y-auto flex-col gap-4 w-full">
          {chats?.map((m, index) => (
            <Message key={index} id={index} message={m} />
          ))}

           <div className="" ref={bottomRef}></div>
        </div>
      </div>


      <form
        onSubmit={handleSubmit}
        className="h-[54px] relative  p-4  flex gap-2 items-center"
      >
        <span
          onClick={(e) => {
            e.stopPropagation();
            showMenu((prev) => !prev);
          }}
        >
          <MdAttachFile
            size={23}
            className="rotate-[25deg] top-0 block cursor-pointer text-gray-600"
          />
        </span>
        <input
        onChange={(e)=>setMessage(e.target.value)}
        value={message}
          type="text"
          placeholder="Type Message Here..."
          className="text-base outline-none w-full h-full
      placeholder:text-base placeholder:font-semibold"
        />

        <button
          type="submit"
          className="block  size-10 text-white p-2 rounded-full bg-[#EA7070] cursor-pointer"
        >
          <IoIosSend size={23} />
        </button>
        <AnimatePresence>{menu && <UploadMenu ref={ref} />}</AnimatePresence>
      </form>

      
    </>
  );
}

export default AppLayout()(Chat);
