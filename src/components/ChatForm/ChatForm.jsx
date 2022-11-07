import React, { useState } from "react";
import Chat from "../ChatMessage/Chat";
import io from "socket.io-client";

const socket = io.connect(`http://localhost:3001`);


const ChatForm = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", { room });
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="message..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Room..."
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}>Click me</button>
      <h1>Message Recived</h1>
      <Chat socket={socket} username={username} room={room} />
    </div>
  );
};

export default ChatForm;
