import styles from "./chatinfo.module.scss";
import UsersInRoom from "../../components/UsersInRoom/UsersInRoom";
import { useEffect, useState } from "react";
import UsersModal from "../../components/UsersModal/UsersModal";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoom } from "../../features/roomSlice";

const ChatInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);

  const room = useSelector((state) =>
    state.room.room.find((item) => item._id === id)
  );

  console.log(room);
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
  }, [dispatch]);

  return (
    <div className={styles.main} onClick={(e) => handleClose(e)}>
      <div className={styles.window} onClick={(e) => handleClose(e)}>
        <div className={styles.header}>
          <div className={styles.image}>
            <img src="" alt="#" />
          </div>
          <div className={styles.info}>
            <h2>{room?.name}</h2>
            <span>Группа: {room?.access.length}</span>
          </div>
        </div>
        {modal ? <UsersModal /> : null}
        <button onClick={handleOpen}>добавить участников</button>
        <UsersInRoom />
      </div>
    </div>
  );
};

export default ChatInfo;
