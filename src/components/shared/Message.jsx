import React, { memo } from "react";
import { lightBlue } from "../../constraints/colors";
import RenderAttachment from "./RenderAttachment";
import moment from "moment";
import { FaCheck, FaClock } from "react-icons/fa6";
import { FaExclamationCircle } from "react-icons/fa";

function Message({ message, user }) {
  // const date = "2025-07-24T12:27:43.428+00:00";
  //const formatted = moment(message.createdAt).fromNow();
  const formatted = moment(message.createdAt).format("h.mm A");

  const icon = {
    failed: <FaExclamationCircle size={12} className="text-red-500" />,
    sent: <FaCheck size={12} className="text-green-500" />,
    sending: <FaClock size={12} className="text-gray-400" />,
  };

  return (
    <div
      className={`bg-white text-black  rounded-[5px] 
    p-2 w-fit max-w-[200px]  md:max-w-[310px] ${
      message?.sender?._id === user?._id ? "self-end" : "self-start"
    }`}
    >
      <p className="font-semibold" style={{ color: lightBlue }}>
        {message?.sender?._id === user?._id ? "You" : message?.sender?.userName}
      </p>

      {message?.attachments?.length > 0 && (
        <div className="flex flex-col gap-1 mb-2">
          {message.attachments?.map((p, i) => (
            <RenderAttachment key={i} url={p.url} ext={p.format} />
          ))}
        </div>
      )}

      <p className="break-words ">{message?.content}</p>

      <div className="flex justify-end items-center gap-2">
        <p className="text-zinc-400 text-xs mt-1">{formatted}</p>
        {message?.sender?._id === user?._id && (
          <span>{icon[message?.status]}</span>
        )}
      </div>
    </div>
  );
}

export default memo(Message);
