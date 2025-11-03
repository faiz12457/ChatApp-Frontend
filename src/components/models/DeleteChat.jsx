import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { motion } from "motion/react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
function DeleteChat({
  groupChat,
  handleDeleteChat,
  activeModel,
  setActiveModel,
}) {
  const ref = useOutsideClick(() => {
    setActiveModel({ anchorRef: null, open: false, chat: null });
  });

  const [position, setPosition] = useState({
    left: null,
    top: null,
  });

  useEffect(() => {
    const rect = activeModel.anchorRef.current.getBoundingClientRect();

    setPosition({ left: rect.right - 30, top: rect.bottom - 25 });
  }, [activeModel]);

  if (!activeModel.anchorRef || !activeModel.open || position.left == null)
    return null;
  return (
    <motion.div
      style={position}
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        setActiveModel({ anchorRef: null, open: false, chat: null });
        handleDeleteChat(id, groupChat);
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="p-2 absolute z-20  flex items-center cursor-pointer gap-2 -right-20 -bottom-5 h-fit bg-white shadow w-[160px]"
    >
      <MdDelete size={23} /> <span>DeleteChat</span>
    </motion.div>
  );
}

export default DeleteChat;
