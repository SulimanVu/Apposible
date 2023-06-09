import { useEffect, useState, useRef } from "react";
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
      {rooms?.length !== 0 && <p>Открытые комнаты для подключения:</p>}
      <ul>
        {rooms?.map((roomID) => (
          <li key={roomID}>
            {roomID}
            <button
              onClick={() => {
                navigate(`/room/web/${roomID}`);
              }}
            >
              Подключиться
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          navigate(`/room/web/${v4()}`);
        }}
      >
        Начать видео-звонок
      </button>
    </div>
  );
};

export default Web;
