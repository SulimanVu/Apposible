// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { fetchFile } from "../../features/fileSlice";
import FileList from "./FileList/FileList";
import styles from "./disk.module.scss";

const Disk = () => {
  // const { id } = useParams();
  // const dispath = useDispatch();
  // const currentDir = useSelector((state) => state.file.currentDir);

  // useEffect(() => {
  //   dispath(fetchFile({ room: id }));
  // }, [dispath, id]);

  return (
    <div className={styles.disk}>
      <div className={styles.buttons}>
        <button className={styles.back}>Назад</button>
        <button className={styles.create}>Создать папку</button>
      </div>
      <FileList />
    </div>
  );
};

export default Disk;
