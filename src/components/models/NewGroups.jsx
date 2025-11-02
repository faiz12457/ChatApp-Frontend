import React, { useState } from "react";
import User from "../shared/User";
import { IoSearchOutline } from "react-icons/io5";
import { motion } from "motion/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../api";
import { useSocket } from "../../context/socketContext";
import { NEW_GROUP_CHAT } from "../../event";
import { showToast } from "../../Toast/toast";

function NewGroups() {
  const [group, setGroup] = useState([]);
  const [groupName, setGroupName] = useState("");
  const socket = useSocket();

  function handleGroup(id) {
    setGroup((prev) => {
      return prev.includes(id) ? prev.filter((i) => i != id) : [...prev, id];
    });
  }

  const groupMutation = useMutation({
    mutationKey: ["newGroupChat"],
    mutationFn: async ({ data }) => {
      const res = await api.post("/chat/newGroupChat", data);
      return res.data;
    },

    onSuccess: ({ chat }) => {
      
      socket.emit(NEW_GROUP_CHAT, chat);
      showToast.success("Group chat created")
    },

    onError: (error) => {
 
    },
  });

  function handleCreateGroup() {
    if (!groupName || group.length < 2) return;

    const newGroup = {
      participants: group,
      name:groupName,
    };

    groupMutation.mutate({ data: newGroup });
    setGroupName("");
    setGroup([]);
  }

  const { data, isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      const res = await api.get("/user/getFriends");
      return res.data;
    },
  });

  return (
    <div className=" min-w-[320px] max-w-[350px] p-8 rounded  bg-white      space-y-4">
      <p className="text-black text-center text-xl">New Group</p>

      <div className="w-full h-10 focus-within:border-blue-500 flex gap-2 px-2 justify-center items-center border rounded border-gray-300">
        <input
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          type="text"
          placeholder="Group Name"
          className="w-full outline-none  h-full"
        />
      </div>

      <p className="font-medium">Members</p>
      <div className="space-y-2 max-h-[300px]  overflow-y-auto">
        {data?.friends?.map((user) => (
          <User
            key={user._id}
            user={user}
            handler={handleGroup}
            isAdded={group.includes(user._id)}
          />
        ))}
      </div>

      <div className="flex w-full justify-between">
        <motion.button
          onClick={handleCreateGroup}
          type="button"
          whileTap={{ scale: 0.9 }}
          className="uppercase py-2 px-6 
              bg-[#1976D2] rounded text-white cursor-pointer"
        >
          Create
        </motion.button>
      </div>
    </div>
  );
}

export default NewGroups;
