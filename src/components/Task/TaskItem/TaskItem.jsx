import { useParams } from "react-router-dom";
import styles from "../task.module.scss";
import { useDispatch, useSelector } from "react-redux";
import del from "../../../images/крестик.png";
import { deleteTask } from "../../../features/taskSlice";

const TaskItem = ({
  header,
  title,
  user,
  startDate,
  completionDate,
  solved,
  _id,
}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) =>
    state.application.users.find((item) => item._id === user)
  );

  const room = useSelector((state) =>
    state.room.room.find((item) => item._id === id)
  );

  let admin = null;
  room?.admin._id === localStorage.getItem("id") && (admin = true);

  function toDate(str) {
    const date = new Date(str);
    const days = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];

    const currentDate = `${date.getDate()} ${
      days[date.getMonth()]
    } ${date.getFullYear()}`;
    return currentDate;
  }

  const handleDeleteTask = () => {
    dispatch(deleteTask(_id));
  };

  return (
    <div key={_id} className={styles.item}>
      {admin && (
        <img
          src={del}
          alt="delete"
          className={styles.delete}
          onClick={handleDeleteTask}
        />
      )}
      <div>
        <h3 className={styles.header}>{header}</h3>
        <p>{title}</p>
      </div>
      <div className={styles.info}>
        <div>
          <span>Начало: </span>
          <span>{toDate(startDate)}</span>
        </div>
        <div>
          <span>Завершение: </span>
          <span>{toDate(completionDate)}</span>
        </div>
        <span className={styles.user}>{currentUser?.name}</span>
      </div>
      <span>{solved}</span>
    </div>
  );
};

export default TaskItem;
