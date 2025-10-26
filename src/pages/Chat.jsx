import React, { useEffect, useRef, useState } from "react";
import { AppLayout } from "../components/HOC/appLayout";
import { rgbGrey } from "../constraints/colors";
import { MdAttachFile } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import UploadMenu from "../components/shared/UploadMenu";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { AnimatePresence } from "motion/react";
import Message from "../components/shared/Message";
import { NEW_MESSAGE_ALERT, NEWMESSAGE } from "../event";
import { useLocation, useParams } from "react-router-dom";
import { useSocket } from "../context/socketContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api";
import { useSelector } from "react-redux";
import { selectLoginUser } from "../redux/slices/auth/authSlice";
import { v4 as uuid } from "uuid";

const messages = [
  {
    _id: "temp123",
    content: "Hey, how are you?",
    sender: {
      email: "john@example.com",
      userName: "john_doe",
      _id: "user123",
    },
    chat: "chat001",
    status: "sending",
    createdAt: new Date().toISOString(),
    attachment: [],
  },
  {
    _id: "temp124",
    content: "All good! Working on the project 😄",
    sender: {
      email: "jane@example.com",
      userName: "jane_smith",
      _id: "user124",
    },
    chat: "chat001",
    status: "sending",
    createdAt: new Date().toISOString(),
    attachment: [],
  },
];

function Chat() {
  const user = useSelector(selectLoginUser);
  const [menu, showMenu] = useState(false);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [images, setImages] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const params = useParams();
  const location = useLocation();

  const socket = useSocket();

  const { chatId } = params;
  const participants = location.state.participants || {};

  const { data ,isLoading} = useQuery({
    queryKey: ["messages", chatId],
    queryFn: async () => {
      const res = await api.get(`/chat/getMessages/${chatId}?page=1&limit=20`);

      setChats(() => res.data.messages);

      return res.data;
    },

    enabled: !!chatId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (data) {
      setTotalPages(data.totalPages);
    }
  }, [data]);
  const queryClient = useQueryClient();
  const messageMutation = useMutation({
    mutationFn: async ({ formData }) => {
      const res = await api.post("/chat/newMessage", formData);
      return res.data;
    },

    onSuccess: ({ message }, { tempId }) => {
      setMessage("");
      setImages();

      setChats((prev) =>
        prev.map((msg) =>
          msg._id === tempId ? { ...message, status: "sent" } : msg
        )
      );
      socket.emit(NEWMESSAGE, {
        message,
        participants: participants.map((p) => p._id),
      });
    },

    onError: (error, { tempId }) => {
      console.log(error);

      setChats((prev) =>
        prev.map((msg) =>
          msg._id === tempId ? { ...msg, status: "failed" } : msg
        )
      );
    },
  });

  function handleSubmit(e) {
    const formData = new FormData();

    e.preventDefault();

    if (message == "" && !images) return;

    if (images) {
      Object.entries(images).forEach(([key, value]) => {
        formData.append("file", value);
      });
    }

    formData.append("content", message);
    formData.append("sender", user?._id);
    formData.append("chat", chatId);

    const tempId = uuid();
    const newMsg = {
      _id: tempId,
      content: message,
      sender: {
        email: user.email,
        userName: user.userName,
        _id: user._id,
      },
      chat: chatId,
      status: "sending",
      createdAt: new Date().toISOString(),
      attachment: [],
    };

    setChats((prev) => [...prev, newMsg]);
    setMessage("");
    setImages();
    messageMutation.mutate({ formData, tempId });
  }

  const ref = useOutsideClick(() => showMenu(false));
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);

  useEffect(() => {
    socket.on(NEWMESSAGE, (data) => {
      setChats((prev) => {
        const exists = prev.some((msg) => msg._id === data._id);
        if (exists) return prev;
        return [...prev, data];
      });
    });

    socket.on(NEW_MESSAGE_ALERT, (data) => {
      //  console.log(data);
    });

    return () => {
      socket.off(NEWMESSAGE);
      socket.off(NEW_MESSAGE_ALERT);
    };
  }, [socket]);

  return (
    <>
      <div
        style={{ backgroundColor: rgbGrey }}
        className="flex h-[calc(100%-60px)]  "
      >
        <div className="p-2 h-[480px] flex   overflow-y-auto flex-col gap-4 w-full">
          {chats?.map((m, index) => (
            <Message key={index} user={user} message={m} />
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
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          type="text"
          placeholder="Type Message Here..."
          className="text-base outline-none w-full h-full
      placeholder:text-base placeholder:font-semibold"
        />

        <button
          type="submit"
          disabled={messageMutation.isPending}
          className="block  size-10 text-white p-2 rounded-full bg-[#EA7070] cursor-pointer"
        >
          <IoIosSend size={23} />
        </button>
        <AnimatePresence>
          {menu && <UploadMenu ref={ref} setImages={setImages} />}
        </AnimatePresence>
      </form>
    </>
  );
}

export default AppLayout()(Chat);
