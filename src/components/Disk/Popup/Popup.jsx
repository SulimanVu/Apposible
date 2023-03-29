import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addDir, fetchFile, modalTrigger } from "../../../features/fileSlice";
import styles from "./popup.module.scss";

const Popup = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [dirName, setDirName] = useState("");
  const modal = useSelector((state) => state.file.modal);

  const handleChange = (e) => {
    setDirName(e.target.value);
  };

  const handleClose = () => {
    dispatch(modalTrigger(!modal));
  };

  const handleAddFile = () => {
    const type = dirName.includes(".")
      ? dirName.match(/\.(\w+)/g)[0].slice(1)
      : "dir";

    const parent = localStorage.getItem("dir")
      ? localStorage.getItem("dir")
      : undefined;

    if (dirName) {
      dispatch(
        addDir({
          name: dirName,
          parent,
          type,
          room: id,
        })
      );
    }

    setDirName("");
  };

  useEffect(() => {
    dispatch(fetchFile());
  }, [dispatch]);
  return (
    <div className={styles.popup}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.title}>
            <span>Для создания файлы указывайте соответсвующее расширение</span>
            <span>
              Для создания папок указывать ничего кроме названия не нужно
            </span>
          </div>
          <button className={styles.close} onClick={handleClose}>
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
