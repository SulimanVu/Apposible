import styles from "./taskModal.module.scss";

const TaskModal = () => {
  return (
    <div className={styles.window} onClick={(e) => e.stopPropagation()}>
      <input type="text" placeholder="Заголовок" />
      <input type="text" placeholder="Описание" />
      <input type="date" placeholder="Время начала" />
      <input type="date" placeholder="Время окончания" />
      <select id="select">
        <option value="В работе">В работе</option>
        <option value="В ожидании">В ожидании</option>
        <option value="Можно тестировать">Можно тестировать</option>
      </select>
      <button>Добавить</button>
    </div>
  );
};

export default TaskModal;
