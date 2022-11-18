import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRoom } from "../../features/roomSlice";
import styles from "./modal.module.scss";

const Modal = () => {
  const user = useSelector((state) => state.application.userId);
  const [roomName, setRoomName] = useState("");
  const dispath = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    setRoomName(e.target.value);
  };

  const handleAddRoom = () => {
    dispath(createRoom({ id: user, name: roomName }));
  };

  return (
    <div className={styles.modal}>
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
        <button onClick={handleAddRoom}>Создать</button>
      </div>
    </div>
  );
};

export default Modal;
