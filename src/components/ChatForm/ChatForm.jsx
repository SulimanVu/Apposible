import React, { useState } from "react";
import Chat from "../ChatMessage/Chat";
import io from "socket.io-client";
import styles from "./chatform.module.scss";

const socket = io.connect(`http://localhost:3001`);

const ChatForm = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  };

  return (
    <div className={styles.window}>
      <Chat socket={socket} username={username} room={room} />
      <input
        type="text"
        placeholder="User..."
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
    </div>
  );
};

export default ChatForm;
