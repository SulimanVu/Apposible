import React from "react";
import io from "socket.io-client";
import styles from "./chatform.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteRoom } from "../../features/roomSlice";
import { serverUrl } from "../../serverUrl";

export const socket = io.connect(serverUrl);
// export const socket = io.connect("http://localhost:3001");

const ChatForm = ({ name, roomID, access }) => {
  const username = useSelector((state) => state.application.login);
  const dispath = useDispatch();
  const navigate = useNavigate();

  const joinRoom = () => {
    if (username !== "" && roomID !== "") {
      socket.emit("join_room", roomID);
      navigate(`/room/${roomID}`);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    dispath(deleteRoom({ id: roomID }));
  };

  return (
    <div className={styles.window} onClick={joinRoom}>
      <h1>
        Комната: <span>{name}</span>
      </h1>
      <button onClick={(e) => handleDelete(e)}>Удалить комнату</button>
    </div>
  );
};

export default ChatForm;
