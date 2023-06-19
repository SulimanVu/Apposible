import styles from "./chatinfo.module.scss";
import UsersInRoom from "../../components/UsersInRoom/UsersInRoom";
import { useEffect, useState } from "react";
import UsersModal from "../../components/UsersModal/UsersModal";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoom } from "../../features/roomSlice";
import { fetchTasksInRoom } from "../../features/taskSlice";
import Task from "../../components/Task/Task";
import { fetchUsers } from "../../features/applicationSlice";
import TaskModal from "../../components/TaskModal/TaskModal";

const ChatInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [userModal, setUserModal] = useState(false);
  const [taskModal, setTaskModal] = useState(false);

  const room = useSelector((state) =>
    state.room.room.find((item) => item._id === id)
  );

  let user;
  room?.admin._id === localStorage.getItem("id")
    ? (user = true)
    : (user = null);

  const handleUserModalOpen = (e) => {
    e.stopPropagation();
    setUserModal(true);
  };

  const handleTaskModalOpen = (e) => {
    e.stopPropagation();
    setTaskModal(true);
  };

  const handleClose = (e) => {
    if (e.currentTarget) {
      setUserModal(false);
      setTaskModal(false);
    }
  };

  useEffect(() => {
    dispatch(fetchRoom({ id: localStorage.getItem("id") }));
    dispatch(fetchTasksInRoom(id));
    dispatch(fetchUsers());
  }, [dispatch, id, user]);

  return (
    <div className={styles.main} onClick={(e) => handleClose(e)}>
      {taskModal ? <TaskModal /> : null}

      <div className={styles.window} onClick={(e) => handleClose(e)}>
        {userModal ? <UsersModal /> : null}

        <div className={styles.header}>
          <div className={styles.leftSide}>
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
          <UsersInRoom />
        </div>
        <button className={styles.addUser} onClick={handleUserModalOpen}>
          Добавить участников
        </button>
        {user && (
          <button className={styles.addTask} onClick={handleTaskModalOpen}>
            Добавить задачу
          </button>
        )}
      </div>
      <h2 className={styles.tasks}>Задачи к выполнению</h2>
      <Task />
    </div>
  );
};

export default ChatInfo;
