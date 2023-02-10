import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../features/applicationSlice";
import styles from "./usersModal.module.scss";

const UsersModal = () => {
  const usersAll = useSelector((state) => state.application.users);
  const dispath = useDispatch();

  useEffect(() => {
    dispath(fetchUsers());
  }, [dispath]);

  return (
    <div className={styles.modal}>
      <div className={styles.close}>x</div>
      {usersAll?.map((user) => {
        return (
          <div key={user._id} className={styles.name}>
            {user.name}
          </div>
        );
      })}
    </div>
  );
};

export default UsersModal;
