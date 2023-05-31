import { useSelector } from "react-redux";
import styles from "./task.module.scss";
import TaskItem from "./TaskItem/TaskItem";

const Task = () => {
  const tasks = useSelector((state) => state.task.tasksInRoom);

  return (
    <div className={styles.tasksBlock}>
      {tasks.map((item) => (
        <TaskItem {...item} />
      ))}
    </div>
  );
};

export default Task;
