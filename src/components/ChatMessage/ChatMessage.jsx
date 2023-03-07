import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addComment, fetchRoom } from "../../features/roomSlice";
import styles from "./chatmessage.module.scss";
import { socket } from "../ChatForm/ChatForm";
// import UsersModal from "../UsersModal/UsersModal";
import { fetchUsers } from "../../features/applicationSlice";
// import UsersInRoom from "../UsersInRoom/UsersInRoom";
import Disk from "../Disk/Disk";

const Chat = () => {
  const { id } = useParams();
  const dispath = useDispatch();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  // const [modal, setModal] = useState(false);

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

  const userID = useSelector((state) => state.application.userId);
  const author = useSelector((state) =>
    state.application.users.find((user) => user._id === userID)
  );

  const minutes =
    new Date(Date.now()).getMinutes() < 10
      ? "0" + new Date(Date.now()).getMinutes()
      : new Date(Date.now()).getMinutes();

  const hours = new Date(Date.now()).getHours();

  const sendMessage = () => {
    dispath(
      addComment({
        id,
        user: userID,
        comment: currentMessage,
        time: hours + ":" + minutes,
      })
    );

    if (currentMessage !== "") {
      const messageData = {
        room: id,
        author: userID,
        authorName: author.name,
        message: currentMessage,
        time: hours + ":" + minutes,
      };

      socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  // const handleOpen = (e) => {
  //   e.stopPropagation();
  //   setModal(true);
  // };

  // const handleClose = (e) => {
  //   if (e.currentTarget) {
  //     setModal(false);
  //   }
  // };

  const handleRouteRoom = () => {
    navigate(`/room/info/${id}`);
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, []);

  useEffect(() => {
    dispath(fetchUsers());
    dispath(fetchRoom());
  }, [dispath]);

  return (
    <div className={styles.bg}>
      <div className={styles.chatWindow}>
        {/* <div className={styles.main} onClick={(e) => handleClose(e)}> */}
        <div className={styles.main}>
          <div className={styles.header}>
            <img
              src={require("../../images/logo2.png")}
              alt="logo"
              onClick={handleRouteRoom}
            />
            {/* {modal ? <UsersModal /> : null}
            <span onClick={(e) => handleOpen(e)}>Добавить участников</span> */}
          </div>
          <div className={styles.chatForm}>
            <div className={styles.body}>
              {messages?.users.map((item) => {
                return (
                  <div
                    className={
                      userID === item.user._id ? styles.you : styles.outher
                    }
                    key={item._id}
                  >
                    <div>
                      <div className={styles.message}>
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
                      <div className={styles.message}>
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
        {/* <UsersInRoom /> */}
        <Disk />
      </div>
    </div>
  );
};

export default Chat;
