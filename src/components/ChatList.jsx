import React, { useEffect, useState } from "react";
import ChatItem from "./shared/ChatItem";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api";
import { useSocket } from "../context/socketContext";
import { NEW_CHAT } from "../event";
import { useParams } from "react-router-dom";
function ChatList({
  chats = [1, 2, 4, 5, 6],
  chatId,
  onlineUsers = [],
  newMessageAlert = [{ chatId: "", count: 0 }],
  handleDeleteChat,
}) {
  const socket = useSocket();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const res = await api.get("/chat/myChats");
      return res.data.chats;
    },
  });

  const params=useParams();

  const {chatId:selectedId}=params

  const [id, setId] = useState(null);
  const [selected, setSelected] = useState(selectedId||null);

  useEffect(() => {
    socket.on(NEW_CHAT, (data) => {
      queryClient.setQueryData(["chats"], (oldData) => {
        if (!oldData) return data;

        return [...oldData, data];
      });
    });

    return () => {
      socket.off(NEW_CHAT);
    };
  }, [socket]);
  return (
    <div className="w-full divide-y divide-gray-300 bg-amber-300 flex flex-col">
      {data?.map((data, index) => {
        return (
          <ChatItem
            key={data?._id}
            selected={selected}
            data={data}
            setSelected={setSelected}
            setId={setId}
            id={id}
            _id={data?._id}
            handleDeleteChat={handleDeleteChat}
            index={index}
          />
        );
      })}
    </div>
  );
}
export default ChatList;
