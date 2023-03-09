import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addDir } from "../../../features/fileSlice";
import styles from "./popup.module.scss";

const Popup = ({ st }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [dirName, setDirName] = useState("");
  const currentDir = useSelector((state) => state.file.currentDir);

  const handleChange = (e) => {
    setDirName(e.target.value);
  };
  const handleAddFile = () => {
    dispatch(
      addDir({ name: dirName, parent: currentDir._id, type: "dir", room: id })
    );
    setDirName("");
  };

  return (
    <div className={styles.popup}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.title}>Создать новую папку</div>
          <button className={styles.close} onClick={() => st(false)}>
            X
          </button>
        </div>
        <input
          type="text"
          placeholder="Введите название ..."
          value={dirName}
          onChange={handleChange}
        />
        <button className={styles.create} onClick={handleAddFile}>
          Создать
        </button>
      </div>
    </div>
  );
};

export default Popup;
