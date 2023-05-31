import styles from "../task.module.scss";

const TaskItem = ({
  header,
  title,
  user,
  startDate,
  completionDate,
  solved,
  _id,
}) => {
  return (
    <div key={_id} className={styles.item}>
      <div>
        <h3>{header}</h3>
        <p>{title}</p>
      </div>
      <div>
        <span>{user.name}</span>
        <span>{startDate}</span>
        <span>{completionDate}</span>
      </div>
      <span>{solved}</span>
    </div>
  );
};

export default TaskItem;
