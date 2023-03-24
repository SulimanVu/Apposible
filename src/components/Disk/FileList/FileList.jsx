import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./fileList.module.scss";
import File from "./file/File";
import { fetchDir, fetchFile } from "../../../features/fileSlice";
import { useParams } from "react-router-dom";

const FileList = () => {
  const { id } = useParams();
  const dispath = useDispatch();
  const files = useSelector((state) => state.file.currentDir);

  useEffect(() => {
    dispath(fetchDir({ dirId: files?._id, room: id }));
  }, [dispath, id]);

  return (
    <div className={styles.fileList}>
      <div className={styles.header}>
        <div className={styles.name}>Название</div>
        <div className={styles.date}>Время</div>
        <div className={styles.size}>Размер</div>
      </div>
      {files?.map((file) => {
        return <File key={file?._id} file={file} />;
      })}
    </div>
  );
};

export default FileList;
