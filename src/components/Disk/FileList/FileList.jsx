import React from "react";
import { useSelector } from "react-redux";
import styles from "./fileList.module.scss";
import File from "./file/File";

const FileList = () => {
  // const files = useSelector(state => state.files.files).map(file => <File key={file._id} />)
  // const files = useSelector(state => state.files.files).map(file => <File />)

  return (
    <div className={styles.fileList}>
      <div className={styles.header}>
        <div className={styles.name}>Название</div>
        <div className={styles.data}>Время</div>
        <div className={styles.size}>Размер</div>
      </div>
    </div>
  );
};

export default FileList;
