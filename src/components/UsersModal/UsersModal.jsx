import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addUserRoom } from "../../features/roomSlice";
import styles from "./usersModal.module.scss";

const UsersModal = () => {
  const dispath = useDispatch();
  const { id } = useParams();

  const usersAll = useSelector((state) =>
    state.application.users.filter(
      (item) => item._id !== localStorage.getItem("id")
    )
  );

  const handleAdd = (e, user) => {
    dispath(addUserRoom({ id: id, user: user._id }));
  };

  return (
    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
      {usersAll?.map((user) => {
        return (
          <div
            key={user._id}
            className={styles.name}
            onClick={(e) => handleAdd(e, user)}
          >
            {user.name}
          </div>
        );
      })}
    </div>
  );
};

export default UsersModal;
