import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteUser } from "../../features/roomSlice";
import styles from "./usersinroom.module.scss";

const UsersInRoom = () => {
  const { id } = useParams();
  const dispath = useDispatch();

  const room = useSelector((state) =>
    state.room.room.find((item) => item._id === id)
  );

  const handleDelete = (user) => {
    dispath(deleteUser({ id: id, user: user }));
  };

  return (
    <div className={styles.users}>
      <div className={styles.head}>Участники комнаты:</div>
      {room?.access.map((item) => {
        return (
          <div className={styles.body} key={item._id}>
            <div
              className={
                item._id === localStorage.getItem("id")
                  ? styles.you
                  : styles.outher
              }
            >
              {item.name}
            </div>
            {item._id !== localStorage.getItem("id") ? (
              <img
                src={require("../../images/delete.png")}
                onClick={() => handleDelete(item._id)}
                alt="delete"
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default UsersInRoom;
