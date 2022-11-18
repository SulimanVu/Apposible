import React from "react";
import io from "socket.io-client";
import styles from "./chatform.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { deleteRoom, fetchRoom } from "../../features/roomSlice";

export const socket = io.connect(`http://localhost:3001`);

const ChatForm = ({ name, roomID, access }) => {
  const username = useSelector((state) => state.application.login);
  const roomAccess = useSelector((state) => state.room.room);

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

  useEffect(() => {
    dispath(fetchRoom());
  }, [dispath]);

  return (
    <div>
      <div className={styles.window} onClick={joinRoom}>
        <h1>
          Комната: <span>{name}</span>
        </h1>
        <button onClick={handleDelete}>Удалить комнату</button>
      </div>
    </div>
  );
};

export default ChatForm;
