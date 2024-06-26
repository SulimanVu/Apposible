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

  console.log(sortRoom);
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
    dispath(fetchRoom({ id: localStorage.getItem("id") }));
  }, [dispath]);

  return (
    <div onClick={(e) => handleClose(e)} className={styles.main}>
      {modal ? <Modal /> : null}
      <div className={styles.header}>
        <button onClick={(e) => handleAdd(e)}>Добавить комнату</button>
      </div>
      {sortRoom?.map((item, index) => {
        return (
          <div key={index}>
            <ChatForm {...item} />
          </div>
        );
      })}
    </div>
  );
};

export default ChatWindow;
