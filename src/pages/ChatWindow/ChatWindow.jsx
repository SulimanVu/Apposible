import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatForm from "../../components/ChatForm/ChatForm";
import Modal from "../../components/Modal/Modal";
import { createRoom, fetchRoom } from "../../features/roomSlice";
import styles from "./chatwindow.module.scss";

const ChatWindow = () => {
  const [modal, setModal] = useState(false);
  const room = useSelector((state) => state.room.room);

  const dispath = useDispatch();

  const handleAdd = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setModal(true);
  };

  useEffect(() => {
    dispath(fetchRoom());
  }, [dispath]);

  return (
    <div onClick={() => setModal(false)}>
      {modal && <Modal />}
      <div className={styles.header}>
        <button onClick={handleAdd}>Добавить комнату</button>
      </div>
      {room.map((item) => {
        return (
          <div key={item._id}>
            <ChatForm
              name={item.name}
              users={item.users}
              access={item.access}
              roomID={item._id}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ChatWindow;
