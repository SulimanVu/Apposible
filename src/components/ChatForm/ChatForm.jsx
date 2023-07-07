import React from "react";
import io from "socket.io-client";
import styles from "./chatform.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteRoom } from "../../features/roomSlice";

export const socket = io.connect("http://localhost:3001");

const ChatForm = ({ name, _id }) => {
  const username = useSelector((state) => state.application.login);
  const dispath = useDispatch();
  const navigate = useNavigate();

  const joinRoom = () => {
    if (username !== "" && _id !== "") {
      socket.emit("join_room", _id);
      navigate(`/room/${_id}`);
    }
  };
  console.log(_id);
  const handleDelete = (e) => {
    e.stopPropagation();
    dispath(deleteRoom({ id: _id }));
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
