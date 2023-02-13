import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addComment, deleteUser, fetchRoom } from "../../features/roomSlice";
import styles from "./chatmessage.module.scss";
import { socket } from "../ChatForm/ChatForm";
import UsersModal from "../UsersModal/UsersModal";
import { fetchUsers } from "../../features/applicationSlice";

const Chat = () => {
  const { id } = useParams();
  const dispath = useDispatch();
  const messagesEndRef = useRef(null);

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [modal, setModal] = useState(false);

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
      return item._id === id || item._id === localStorage.getItem("room");
    })
  );

  const userID = useSelector((state) => state.application.userId);
  const author = useSelector((state) => state.application.user);
  const room = useSelector((state) =>
    state.room.room.find((item) => item._id === id)
  );

  const sendMessage = () => {
    dispath(
      addComment({
        id,
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

  const handleDelete = (user) => {
    dispath(deleteUser({ id: id, user }));
  };

  const handleOpen = (e) => {
    e.stopPropagation();
    setModal(true);
  };

  const handleClose = (e) => {
    if (e.currentTarget) {
      setModal(false);
    }
  };

  useEffect(() => {
    dispath(fetchRoom());
  }, [dispath]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, []);

  return (
    <div className={styles.chatWindow}>
      <div className={styles.main} onClick={(e) => handleClose(e)}>
        <div className={styles.header}>
          <img src={require("../../images/logo2.png")} alt="logo" />
          {modal ? <UsersModal /> : null}
          <span onClick={(e) => handleOpen(e)}>Добавить участников</span>
        </div>
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
      <div className={styles.users}>
        <div className={styles.head}>Участники комнаты:</div>
        {room.access.map((item) => {
          return (
            <div className={styles.body} key={item._id}>
              <div
                className={
                  item._id == localStorage.getItem("id")
                    ? styles.you
                    : styles.outher
                }
              >
                {item.name}
              </div>
              {item._id !== localStorage.getItem("id") ? (
                <img
                  src={require("../../images/delete.png")}
                  onClick={() => handleDelete(item._id)}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Chat;
