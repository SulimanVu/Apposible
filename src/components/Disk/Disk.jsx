import { useState } from "react";
import FileList from "./FileList/FileList";
import styles from "./disk.module.scss";
import Popup from "./Popup/Popup";

const Disk = () => {
  const [modal, setModal] = useState(false);

  const handleAddFile = () => {
    setModal(true);
  };

  return (
    <div className={styles.disk}>
      {modal ? <Popup st={setModal} /> : null}
      <div className={styles.buttons}>
        <button className={styles.back}>Назад</button>
        <button className={styles.create} onClick={handleAddFile}>
          Создать
        </button>
      </div>
      <FileList />
    </div>
  );
};

export default Disk;
