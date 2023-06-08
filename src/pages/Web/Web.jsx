import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import styles from "./web.module.scss";
import { socket } from "../../components/ChatForm/ChatForm";

const Web = () => {
  let navigate = useNavigate();
  const [rooms, setRooms] = useState();
  const rootNode = useRef();

  useEffect(() => {
    socket.on("share-rooms", ({ rooms = [] } = {}) => {
      if (rootNode.current) {
        setRooms(rooms);
      }
    });
  }, []);

  return (
    <div ref={rootNode} className={styles.web}>
      <h1>Available Rooms</h1>
      <ul>
        {rooms?.map((roomID) => (
          <li key={roomID}>
            {roomID}
            <button
              onClick={() => {
                navigate(`/room/web/${v4(roomID)}`);
              }}
            >
              JOIN ROOM
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          navigate(`/room/web/${v4()}`);
        }}
      >
        CREATE NEW ROOM
      </button>
    </div>
  );
};

export default Web;
