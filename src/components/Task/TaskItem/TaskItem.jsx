import styles from "../task.module.scss";
import { useSelector } from "react-redux";

const TaskItem = ({
  header,
  title,
  user,
  startDate,
  completionDate,
  solved,
  _id,
}) => {
  const currentUser = useSelector((state) =>
    state.application.users.find((item) => item._id === user)
  );

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

  return (
    <div key={_id} className={styles.item}>
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
        <span className={styles.user}>{currentUser.name}</span>
      </div>
      <span>{solved}</span>
    </div>
  );
};

export default TaskItem;
