export const socketId = localStorage.getItem("socket_id");
export const connectIO = () => {
  const socket = io("http://localhost:3000", {
    query: {
      sessionId: socketId,
    },
  });
  socket.on(
    "getID",
    (id) => socketId == null && localStorage.setItem("socket_id", id)
  );
  return { socket };
};
