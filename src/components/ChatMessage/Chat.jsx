import React from "react";
import { useEffect, useState } from "react";
import styles from "./chatmessage.module.scss";

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(111);
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div>
      <div className={styles.header}>
        <h1>Live Chat</h1>
      </div>
      <div className={styles.body}>
        {messageList.map((messageContent, index) => {
          return (
            <div
              className={
                username === messageContent.author ? styles.you : styles.outher
              }
              key={index}
            >
              <div>
                <div>
                  <span>{messageContent.message}</span>
                </div>
                <div className={styles.comment_footer}>
                  <span className={styles.time}>{messageContent.time}</span>
                  <span className={styles.author}>{messageContent.author}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.footer}>
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={(e) => {
            e.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
};

export default Chat;
