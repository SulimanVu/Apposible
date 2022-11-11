import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatForm from "../../components/ChatForm/ChatForm";
import { fetchRoom } from "../../features/roomSlice";
import styles from "./chatwindow.module.scss";

const ChatWindow = () => {
  const room = useSelector((state) => state.room.room);
  const dispath = useDispatch();

  useEffect(() => {
    dispath(fetchRoom());
  }, [dispath]);

  return (
    <div>
      {room.map((item, index) => {
        return (
          <ChatForm
            name={item.name}
            users={item.users}
            access={item.access}
            roomID={item._id}
            id={index}
          />
        );
      })}
    </div>
  );
};

export default ChatWindow;
