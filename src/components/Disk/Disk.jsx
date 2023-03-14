import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addDir, fetchFile } from "../../features/fileSlice";
import FileList from "./FileList/FileList";
import styles from "./disk.module.scss";
import Popup from "./Popup/Popup";

const Disk = () => {
  const { id } = useParams();
  const dispath = useDispatch();
  const [modal, setModal] = useState(false);

  const handleAddFile = () => {
    setModal(true);
  };

  useEffect(() => {
    dispath(fetchFile({ room: id }));
  }, [dispath, id]);

  return (
    <div className={styles.disk}>
      {modal ? <Popup st={setModal} /> : null}
      <div className={styles.buttons}>
        <button className={styles.back}>Назад</button>
        <button className={styles.create} onClick={handleAddFile}>
          Создать папку
        </button>
      </div>
      <FileList />
    </div>
  );
};

export default Disk;
