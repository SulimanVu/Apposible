import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatForm from "../../components/ChatForm/ChatForm";
import Modal from "../../components/Modal/Modal";
import { fetchRoom } from "../../features/roomSlice";
import styles from "./chatwindow.module.scss";

const ChatWindow = () => {
  const [modal, setModal] = useState(false);
  const sortRoom = useSelector((state) => state.room.room);
  const user = localStorage.getItem("id");

  const dispath = useDispatch();

  const handleAdd = (e) => {
    e.stopPropagation();
    setModal(true);
  };

  const handleClose = (e) => {
    if (e.currentTarget) {
      setModal(false);
    }
  };

  useEffect(() => {
    dispath(fetchRoom({ id: user }));
  }, [dispath]);

  return (
    <div onClick={(e) => handleClose(e)} className={styles.main}>
      {modal ? <Modal /> : null}
      <div className={styles.header}>
        <button onClick={(e) => handleAdd(e)}>Добавить комнату</button>
      </div>
      {sortRoom?.map((item) => {
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
