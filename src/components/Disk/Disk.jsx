import FileList from "./FileList/FileList";
import styles from "./disk.module.scss";
import Popup from "./Popup/Popup";
import { useDispatch, useSelector } from "react-redux";
import { fetchFile, uploadFile } from "../../features/fileSlice";
import { modalTrigger } from "../../features/fileSlice";
import { useParams } from "react-router-dom";
import { useState } from "react";

const Disk = () => {
  const { id } = useParams();
  const [dragEnter, setDragEnter] = useState(false);
  const modal = useSelector((state) => state.file.modal);
  const dispatch = useDispatch();

  const handleAddFile = () => {
    dispatch(modalTrigger(!modal));
  };

  const handleBack = () => {
    localStorage.removeItem("dir");
    dispatch(fetchFile({ room: id }));
  };

  const handleFileUpload = (e) => {
    const files = [...e.target.files];
    const parent = localStorage.getItem("dir")
      ? localStorage.getItem("dir")
      : undefined;
    files.forEach((file) => dispatch(uploadFile({ file, parent, room: id })));
  };

  const dragEnterHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(true);
  };

  const dragLeaveHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(false);
  };

  const dropHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let files = [...e.dataTransfer.files];

    const parent = localStorage.getItem("dir")
      ? localStorage.getItem("dir")
      : undefined;
    files.forEach((file) => dispatch(uploadFile({ file, parent, room: id })));
    setDragEnter(false);
  };

  return !dragEnter ? (
    <div
      className={styles.disk}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
    >
      {modal ? <Popup /> : null}
      <div className={styles.buttons}>
        <button className={styles.back} onClick={handleBack}>
          Назад
        </button>
        <button className={styles.create} onClick={handleAddFile}>
          Создать
        </button>
        <div className={styles.file_load}>
          <label htmlFor="disk_upload">Загрузить файл</label>
          <input
            multiple={true}
            type="file"
            id="disk_upload"
            onChange={(e) => handleFileUpload(e)}
          />
        </div>
      </div>

      <FileList />
    </div>
  ) : (
    <div
      className={styles.drop_area}
      onDrop={dropHandler}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
    >
      Перетащите сюда файл
    </div>
  );
};

export default Disk;
