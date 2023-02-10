import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../features/applicationSlice";
import { addUserRoom, fetchRoom } from "../../features/roomSlice";
import styles from "./usersModal.module.scss";

const UsersModal = () => {

  const usersAll = useSelector((state) =>
    state.application.users.filter(
      (item) => item._id !== localStorage.getItem("id")
    )
  );
  const dispath = useDispatch();

  const handleAdd = (e, user) => {
    dispath(addUserRoom({ id: localStorage.getItem("room"), user: user._id }));
  };

  useEffect(() => {
    dispath(fetchUsers());
    dispath(fetchRoom());
  }, [dispath]);

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
