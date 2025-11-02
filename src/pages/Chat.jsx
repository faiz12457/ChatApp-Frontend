import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AppLayout } from "../components/HOC/appLayout";
import { rgbGrey } from "../constraints/colors";
import { MdAttachFile } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import {FaTimes } from "react-icons/fa";
import UploadMenu from "../components/shared/UploadMenu";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { AnimatePresence } from "motion/react";
import Message from "../components/shared/Message";
import { NEW_MESSAGE_ALERT, NEWMESSAGE } from "../event";
import { useLocation, useParams } from "react-router-dom";
import { useSocket } from "../context/socketContext";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import api from "../api";
import { useSelector } from "react-redux";
import { selectLoginUser } from "../redux/slices/auth/authSlice";
import { v4 as uuid } from "uuid";

import { useInView } from "framer-motion";
import ChatList from "../components/ChatList";

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
  const fetchRef = useRef(null);

  const isInView = useInView(fetchRef, {
    amount: 1,
  });
  const user = useSelector(selectLoginUser);
  const [menu, showMenu] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const params = useParams();
  const location = useLocation();

  const socket = useSocket();
  const queryClient = useQueryClient();
  const { chatId } = params;
  const participants = location.state.participants ?? {};

  const ref = useOutsideClick(() => showMenu(false));
  const bottomRef = useRef(null);
  const shouldScrollToBottom = useRef(true);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["messages", chatId],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await api.get(
          `/chat/getMessages/${chatId}?page=${pageParam}&limit=${10}`
        );
        return res.data;
      },
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.hasNextPage ? allPages.length + 1 : undefined;
      },

      enabled: !!chatId,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    });

  const allMessages =
    data?.pages.flatMap((page) => page.messages).reverse() ?? [];

  const firstLoad = useRef(false);

  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chatId]);

  useEffect(() => {
    if (data && !firstLoad.current) {
      firstLoad.current = true;
      bottomRef.current.scrollIntoView({ behavior: "smooth" });

      return;
    }

    if (isInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isInView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const messageMutation = useMutation({
    mutationFn: async ({ formData }) => {
      const res = await api.post("/chat/newMessage", formData);
      return res.data;
    },

    onMutate: async ({ tempMsg }) => {
      await queryClient.cancelQueries({ queryKey: ["messages", chatId] });

      const prevData = queryClient.getQueryData(["messages", chatId]);

      queryClient.setQueryData(["messages", chatId], (old) => {
        if (!old) return old;

        const index = 0;
        const newPages = [...old.pages];
        const page = newPages[index];

        newPages[index] = {
          ...page,
          messages: [tempMsg, ...page.messages],
        };
        return { ...old, pages: newPages };
      });

      shouldScrollToBottom.current = true;

      return { prevData };
    },

    onSuccess: ({ message: serverMessage }, { tempId, incomingChatId }) => {
      
      setMessage("");
      setSelectedFiles([]);

      queryClient.setQueryData(["messages", incomingChatId], (old) => {
        if (!old) return old;
        const newPages = old.pages.map((page) => ({
          ...page,
          messages: page.messages.map((m) =>
            m._id === tempId ? serverMessage : m
          ),
        }));
        return { ...old, pages: newPages };
      });

      socket.emit(NEWMESSAGE, {
        message: serverMessage,
        participants: participants.map((p) => p._id),
        chatId,
      });
    },

    onError: (error, { tempId, incomingChatId }) => {
      queryClient.setQueryData(["messages", incomingChatId], (old) => {
        if (!old) return old;
        const newPages = old.pages.map((page) => ({
          ...page,
          messages: page.messages.map((m) =>
            m._id === tempId ? { ...msg, status: "failed" } : m
          ),
        }));
        return { ...old, pages: newPages };
      });
    },
  });

  function handleSubmit(e) {
    const formData = new FormData();

    e.preventDefault();

    if (message == "" && !selectedFiles) return;
    let tempUrl = [];

    if (selectedFiles) {
      selectedFiles.forEach(({ file ,id}) => {
        let url = URL.createObjectURL(file);
        formData.append('file',file);
        tempUrl.push({
          url,
          format: file.name.split(".").pop(),
          public_id: id,
        });
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
      attachments: tempUrl,
    };

    shouldScrollToBottom.current = true;
    setMessage("");
  setSelectedFiles([]);
    messageMutation.mutate({
      formData,
      tempMsg: newMsg,
      tempId,
      incomingChatId: chatId,
    });
  }

  // useEffect(() => {
  //   if (bottomRef.current && shouldScrollToBottom.current) {
  //     bottomRef.current.scrollIntoView({ behavior: "smooth" });
  //     shouldScrollToBottom.current = false;
  //   }
  // }, [allMessages]);

  useEffect(() => {
    if (shouldScrollToBottom.current) {
      const timeout = setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        shouldScrollToBottom.current = false;
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [allMessages]);

  useEffect(() => {
    socket.on(NEWMESSAGE, ({ message: data, chatId: incomingChatId }) => {
      queryClient.setQueryData(["messages", incomingChatId], (old) => {
        if (!old) return old;

        const newPages = [...old.pages];
        const index = 0;
        const page = newPages[index];

        newPages[index] = {
          ...page,
          messages: [data, ...page.messages],
        };

        return { ...old, pages: newPages };
      });

      shouldScrollToBottom.current = true;
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
        className="flex flex-col h-[calc(100%-60px)]  "
      >
        <div className="p-2 max-h-[480px] h-full flex fkex-1   overflow-y-auto flex-col gap-4 w-full">
          <div ref={fetchRef}></div>
          {allMessages?.map((m, index) => (
            <Message key={index} user={user} message={m} />
          ))}

          <div className="" ref={bottomRef}></div>
        </div>

          <SelectedFiles
        setSelectedFiles={setSelectedFiles}
        selectedFiles={selectedFiles}
      />
      </div>

    
      <form
        onSubmit={handleSubmit}
        className="h-[54px] relative   p-4  flex gap-2 items-center"
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
          {menu && (
            <UploadMenu
              ref={ref}
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
              showMenu={showMenu}
            />
          )}
        </AnimatePresence>
      </form>
    </>
  );
}

export default AppLayout()(Chat);


function SelectedFiles({ selectedFiles = [], setSelectedFiles }) {
  const removeFile = (id) => {
    setSelectedFiles((prev) => prev.filter((p) => p.id !== id));
  };

  if (selectedFiles.length === 0) return null;

  return (
    <div className="px-3 mb-2 rounded-md flex flex-wrap gap-2">
      {selectedFiles.map((file) => (
        <div
          key={file.id}
          className="flex items-center gap-2 bg-gray-300 rounded-md px-2 py-1 text-sm"
        >
          <span className="truncate max-w-[80px]">{file.name}</span>
          <button
            type="button"
            onClick={() => removeFile(file.id)}
            className="text-gray-500 cursor-pointer hover:text-red-500"
          >
            <FaTimes size={12} />
          </button>
        </div>
      ))}
    </div>
  );
}

