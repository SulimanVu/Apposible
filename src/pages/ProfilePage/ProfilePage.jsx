import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUsers } from "../../features/applicationSlice";
import styles from "./profilepage.module.scss";
import avatar from "../../images/avatar.svg";

const ProfilePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) =>
    state.application.users.filter(
      (item) => item._id === localStorage.getItem("id") || item._id === id
    )
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        {user.map((item) => {
          return (
            <React.Fragment key={item._id}>
              <div className={styles.avatar}>
                {item.avatar ? (
                  <img src={item.avatar} alt="avatar" />
                ) : (
                  <img src={avatar} alt="avatar" />
                )}
                <div className={styles.buttons}>
                  <button className={styles.add}>Добавить фото</button>
                  {!item.avatar ? null : (
                    <button className={styles.delete}> Удалить</button>
                  )}
                </div>
              </div>

              <div className={styles.info}>
                <input type="text" placeholder={item.name} />
                <input type="text" placeholder={item.email} />
                <input type="text" placeholder={item.login} />
                <button>Сохранить</button>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProfilePage;
