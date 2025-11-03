import React, { useEffect, useRef, useState } from "react";
import ChatItem from "./shared/ChatItem";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api";
import { useSocket } from "../context/socketContext";
import { NEW_CHAT, NEW_MESSAGE_ALERT } from "../event";
import { useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import DeleteChat from "./models/DeleteChat";
function ChatList({
  chats = [1, 2, 4, 5, 6],
  chatId,
  onlineUsers = [],
  newMessageAlert = [{ chatId: "", count: 0 }],
  handleDeleteChat,
}) {
  const socket = useSocket();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const res = await api.get("/chat/myChats");
      return res.data.chats;
    },

    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const params = useParams();

  const { chatId: selectedId } = params;

  
  const [selected, setSelected] = useState(selectedId || null);
  const [activeModel, setActiveModel] = useState({
    open: false,
    anchorRef: null,
    chat: null,
  });

  const selectedRef = useRef(selected);

  const openChat = async (chatId) => {
    
    setSelected(chatId);

    queryClient.setQueryData(["chats"], (oldChats) => {
      if (!oldChats) return [];
      return oldChats.map((chat) =>
        chat._id === chatId ? { ...chat, unreadCount: 0 } : chat
      );
    });

    try {
      await api.post(`/chat/read/${chatId}`);
    } catch (err) {
      console.error("Failed to mark chat as read", err);
    }
  };

  function updateUnreadCount(chatId) {
    if (selectedRef.current !== chatId) {
      queryClient.setQueryData(["chats"], (chats) => {
        return chats.map((chat) => {
          return chat._id === chatId
            ? { ...chat, unreadCount: (chat.unreadCount || 0) + 1 }
            : chat;
        });
      });
    }
  }

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  useEffect(() => {
    socket.on(NEW_CHAT, (data) => {
      queryClient.setQueryData(["chats"], (oldData) => {
        if (!oldData) return data;

        return [...oldData, data];
      });
    });

    socket.on(NEW_MESSAGE_ALERT, async (chatId) => {
      if (selectedRef.current === chatId) {
        try {
          await api.post(`/chat/read/${chatId}`);

          queryClient.setQueryData(["chats"], (chats) => {
            return chats.map((chat) =>
              chat._id === chatId ? { ...chat, unreadCount: 0 } : chat
            );
          });
        } catch (error) {
          console.error("Failed to mark chat as read:", err);
        }
      } else {
        updateUnreadCount(chatId);
      }
    });

    return () => {
      socket.off(NEW_CHAT);
      socket.off(NEW_MESSAGE_ALERT);
    };
  }, [socket]);

  return isLoading ? (
    <span>loading...</span>
  ) : (
    <div className="w-full divide-y divide-gray-300 bg-amber-300 flex flex-col">
      {data?.map((data, index) => {
        return (
          <ChatItem
            key={data?._id}
            selected={selected}
            data={data}
            setSelected={setSelected}
            _id={data?._id}
            handleDeleteChat={handleDeleteChat}
            index={index}
            openChat={openChat}
            setActiveModel={setActiveModel}
            activeModel={activeModel}
          />
        );
      })}


       <AnimatePresence>
            { activeModel.open && (
              <DeleteChat
                handleDeleteChat={handleDeleteChat}
                activeModel={activeModel}
                setActiveModel={setActiveModel}
                
              />
            )}
          </AnimatePresence>
    </div>
  );
}
export default ChatList;
