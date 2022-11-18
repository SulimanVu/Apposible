import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addComment } from "../../features/roomSlice";
import styles from "./chatmessage.module.scss";
import { socket } from "../ChatForm/ChatForm";

const Chat = () => {
  const { id } = useParams();
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const messages = useSelector((state) =>
    state.room.room.find((message) => {
      return message._id === id;
    })
  );
  const currentRoom = useSelector((state) =>
    state.room.room.filter((item) => {
      return item._id === id;
    })
  );

  const userID = useSelector((state) => state.application.userId);
  const author = useSelector((state) => state.application.user);

  const dispath = useDispatch();

  const sendMessage = () => {
    dispath(
      addComment({
        id: id,
        user: userID,
        comment: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      })
    );

    if (currentMessage !== "") {
      const messageData = {
        room: id,
        author: userID,
        authorName: author,
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
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className={styles.main}>
      <div className={styles.chatForm}>
        <div className={styles.body}>
          {messages.users.map((item, index) => {
            return (
              <div
                className={
                  userID === item.user._id ? styles.you : styles.outher
                }
                key={item._id}
              >
                <div>
                  <div>
                    <span>{item.comment}</span>
                  </div>
                  <div className={styles.comment_footer}>
                    <span className={styles.time}>{item.time}</span>
                    <span className={styles.author}>{item.user.name}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {currentRoom.map((item, index) => {
          return (
            <div key={item._id}>
              <div className={styles.body}>
                {messageList.map((messageContent, index) => {
                  return (
                    <div
                      className={
                        userID === messageContent.author
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
                            {messageContent.authorName}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
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
        {/* <button onClick={sendMessage}>&#9658;</button> */}
      </div>
    </div>
  );
};

export default Chat;
