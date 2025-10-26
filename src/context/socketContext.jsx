import { createContext, useContext, useEffect, useMemo } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const Socket = ({ children }) => {
  const socket = useMemo(() => {
    const token = localStorage.getItem("accessToken"); // or from context/state

    return io(import.meta.env.VITE_API_URL, {
      autoConnect: false,
      auth: {
        token, // send token in handshake
      },
      withCredentials: true, // optional if CORS cookies used
    });
  }, []);

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("connect_error", async (err) => {
      console.error("Socket connection error:", err.message);

      if (
        err.message.includes("Invalid token") ||
        err.message.includes("jwt expired")
      ) {
        try {
          // Request a new token
          const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/refresh`,
            {},
            { withCredentials: true }
          );
          const token = res.data.accessToken;
          if (token) {
            localStorage.setItem("accessToken", token);

            // Update socket auth & reconnect
            socket.auth = { token };
            connectSocket();
          }
        } catch (refreshErr) {
          localStorage.removeItem("accessToken");
          window.location.href = "/login";
        }
      }
    });

    return () => {
      socket.disconnect();
      console.log("socket disconnected");
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
