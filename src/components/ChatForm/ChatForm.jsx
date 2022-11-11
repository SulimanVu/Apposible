import React, { useState } from "react";
import Chat from "../ChatMessage/Chat";
import io from "socket.io-client";
import styles from "./chatform.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchRoom } from "../../features/roomSlice";

export const socket = io.connect(`http://localhost:3001`);

const ChatForm = ({ name, users, access, id, roomID }) => {
  const username = useSelector((state) => state.application.login);

  const dispath = useDispatch();
  const navigate = useNavigate();

  const joinRoom = () => {
    if (username !== "" && roomID !== "") {
      socket.emit("join_room", roomID);
      navigate(`/room/${roomID}`);
    }
  };
  useEffect(() => {
    dispath(fetchRoom());
  }, [dispath]);

  return (
    <div className={styles.window} key={id} onClick={joinRoom}>
      <h1>Комната:</h1>
      <span>{name}</span>
    </div>
  );
};

export default ChatForm;
