import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRoom, fetchRoom } from "../../features/roomSlice";
import styles from "./modal.module.scss";

const Modal = () => {
  const user = useSelector((state) => state.application.userId);
  const [roomName, setRoomName] = useState("");
  const dispath = useDispatch();

  const handleChange = (e) => {
    setRoomName(e.target.value);
  };

  const handleAddRoom = () => {
    if (roomName.length > 0) {
      dispath(createRoom({ id: user, name: roomName, admin: user }));
      dispath(fetchRoom({ id: localStorage.getItem("id") }));
    }
  };

  return (
    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
      <div className={styles.modalName}>Введите название группы : </div>
      <div className={styles.inputBlock}>
        <input
          type="text"
          value={roomName}
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => {
            e.key === "Enter" && handleAddRoom();
          }}
        />
        <button onClick={() => handleAddRoom()}>Создать</button>
      </div>
    </div>
  );
};

export default Modal;
