import styles from "./chatinfo.module.scss";
import UsersInRoom from "../../components/UsersInRoom/UsersInRoom";
import { useEffect, useState } from "react";
import UsersModal from "../../components/UsersModal/UsersModal";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoom } from "../../features/roomSlice";
import { fetchTasksInRoom } from "../../features/taskSlice";
import Task from "../../components/Task/Task";

const ChatInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);

  const room = useSelector((state) =>
    state.room.room.find((item) => item._id === id)
  );

  const handleOpen = (e) => {
    e.stopPropagation();
    setModal(true);
  };

  const handleClose = (e) => {
    if (e.currentTarget) {
      setModal(false);
    }
  };

  useEffect(() => {
    dispatch(fetchRoom());
    dispatch(fetchTasksInRoom(id));
  }, [dispatch, id]);

  return (
    <div className={styles.main} onClick={(e) => handleClose(e)}>
      <div className={styles.window} onClick={(e) => handleClose(e)}>
        {modal ? <UsersModal /> : null}
        <div className={styles.header}>
          <div className={styles.image}>
            {room?.image ? (
              <img src={room.image} alt="#" />
            ) : (
              <img src={require("../../images/room_logo.png")} alt="#" />
            )}
          </div>
          <div className={styles.info}>
            <h2>{room?.name}</h2>
            <span>Участников: {room?.access.length}</span>
          </div>
        </div>
        <button className={styles.addUser} onClick={handleOpen}>
          Добавить участников
        </button>
        <UsersInRoom />
      </div>
      <h2 className={styles.tasks}>Задачи к выполнению</h2>
      <Task />
    </div>
  );
};

export default ChatInfo;
