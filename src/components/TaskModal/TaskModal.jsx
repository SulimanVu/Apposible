import { useDispatch, useSelector } from "react-redux";
import styles from "./taskModal.module.scss";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { createTask } from "../../features/taskSlice";

const TaskModal = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const room = useSelector((state) =>
    state.room.room.find((item) => item._id === id)
  );

  const [header, setHeader] = useState();
  const [title, setTitle] = useState();
  const [startDate, setStartDate] = useState();
  const [user, setUser] = useState();
  const [completionDate, setCompletionDate] = useState();
  const [solved, setSolved] = useState();

  const handleAddTask = () => {
    dispatch(
      createTask({
        header,
        title,
        room,
        user,
        startDate,
        completionDate,
        solved,
      })
    );
  };
  return (
    <div className={styles.window} onClick={(e) => e.stopPropagation()}>
      <input
        type="text"
        value={header}
        placeholder="Заголовок"
        onChange={(e) => setHeader(e.target.value)}
      />
      <input
        type="text"
        placeholder="Описание"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="date"
        placeholder="Время начала"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        placeholder="Время окончания"
        value={completionDate}
        onChange={(e) => setCompletionDate(e.target.value)}
      />
      <span>Состояние задачи: </span>
      <select onChange={(e) => setSolved(e.target.value)} id="TaskSelect">
        <option value="В работе">В работе</option>
        <option value="В ожидании">В ожидании</option>
        <option value="Можно тестировать">Можно тестировать</option>
      </select>
      <span>Назначить задачу: </span>
      <select onChange={(e) => setUser(e.target.value)} id="UserSelect">
        {room.access.map((user) => {
          return <option value={user._id}>{user.name}</option>;
        })}
      </select>
      <button onClick={handleAddTask}>Добавить</button>
    </div>
  );
};

export default TaskModal;
