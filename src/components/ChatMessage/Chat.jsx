import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchRoom } from "../../features/roomSlice";
import styles from "./chatmessage.module.scss";
import { socket } from "../ChatForm/ChatForm";

const Chat = () => {
  const { id } = useParams();
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const author = useSelector((state) => state.application.name);

  const currentRoom = useSelector((state) =>
    state.room.room.filter((item) => item._id === id)
  );

  const dispath = useDispatch();
  const sendMessage = () => {
    if (currentMessage !== "") {
      const messageData = {
        room: id,
        author: author,
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
    dispath(fetchRoom());
  }, [dispath]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div>
      {currentRoom.map((item, index) => {
        return (
          <div key={item._id}>
            <div className={styles.header}>
              <h1 style={{ color: "red" }}>{item.name}</h1>
            </div>
            <div className={styles.body}>
              {messageList.map((messageContent, index) => {
                return (
                  <div
                    className={
                      author === messageContent.author
                        ? styles.you
                        : styles.outher
                    }
                    key={index}
                  >
                    <div>
                      <div>
                        <span>{messageContent.message}</span>
                      </div>
                      <div className={styles.comment_footer}>
                        <span className={styles.time}>
                          {messageContent.time}
                        </span>
                        <span className={styles.author}>
                          {messageContent.author}
                        </span>
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
      })}
    </div>
  );
};

export default Chat;
