import React, { useEffect } from "react";
import Request from "../shared/Request";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../api";
import { useSocket } from "../../context/socketContext";
import { NEW_CHAT, NEW_NOTIFICATION } from "../../event";

function Notifications() {


  const queryClient=useQueryClient();
  const { data } = useQuery({
    queryKey: ["notification"],
    queryFn: async () => {
      const res = await api.get("/user/notification");
      return res.data.request;
    },
  });

const socket=useSocket();



const reqMutation=useMutation({
  mutationFn:async(data)=>{
    const res=await api.post("/user/acceptRequest",data)
    return res.data.chat;
  },


  onSuccess:(chat)=>{
    
     socket.emit(NEW_CHAT,chat);
    queryClient.invalidateQueries(["notification"]);


  }
})


function acceptOrRejectReq(data){
  
  reqMutation.mutate(data)
  
}


 useEffect(() => {
  const handleNotification = (request) => {
    console.log("New notification:", request);
    queryClient.setQueryData(["notification"], (oldData) => {
      if (!oldData) return [request];
      return [...oldData, request];
    });
  };

  socket.on(NEW_NOTIFICATION, handleNotification);

  return () => {
    socket.off(NEW_NOTIFICATION, handleNotification);
  };
}, [socket, queryClient]);


  return (
    <div className=" rounded min-h-40 max-h-[300px] p-8 bg-white space-y-2">
      <p className="text-xl text-black font-medium text-center">
        Notifications{" "}
      </p>
      <div className="overflow-y-auto space-y-2 text-center py-2 max-h-[200px] min-w-[400px] ">
        {data?.length>0 ? (
          data?.map((req,i) => <Request key={i} request={req} handler={acceptOrRejectReq}  />)
        ) : (
          <span className="text-gray-500 text-center">Empty</span>
        )}
      </div>
    </div>
  );
}

export default Notifications;
