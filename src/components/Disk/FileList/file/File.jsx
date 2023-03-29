import React from "react";
import styles from "./file.module.scss";
import { BsFiletypeHtml } from "react-icons/bs";
import { BsFiletypeScss } from "react-icons/bs";
import { SiJavascript } from "react-icons/si";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { AiFillFileImage } from "react-icons/ai";
import { AiFillFileWord } from "react-icons/ai";
import { FaFilePowerpoint } from "react-icons/fa";
import { FaRegFileArchive } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { fetchFile } from "../../../../features/fileSlice";
import { useParams } from "react-router-dom";

const File = ({ file }) => {
  const { id } = useParams();
  const image = ["img", "jpeg", "jpg", "svg", "png"];
  const dispatch = useDispatch();

  const handleOpenDir = () => {
    dispatch(fetchFile({ parent: file._id, room: id }));
    localStorage.setItem("dir", file._id);
  };

  return (
    <div
      className={styles.file}
      onClick={file.type === "dir" ? () => handleOpenDir() : null}
    >
      {file.type === "dir" && <AiTwotoneFolderOpen size={22} />}
      {file.type === "html" && <BsFiletypeHtml size={22} />}
      {file.type === "css" && <BsFiletypeScss size={22} />}
      {file.type === "js" && <SiJavascript size={22} />}
      {file.type === "pptx" && <FaFilePowerpoint size={22} />}
      {file.type === "docx" && <AiFillFileWord size={22} />}
      {file.type === "rar" && <FaRegFileArchive size={22} />}

      {image.includes(file.type) && <AiFillFileImage size={22} />}

      <div className={styles.name}>{file.name}</div>
      <div className={styles.date}>
        {file.date?.slice(0, 10).replace(/[-/]/g, ".")}
      </div>
      <div className={styles.size}>
        {file.size >= 1000000
          ? `${file.size / 1000000}`.slice(0, 5) + " Мб"
          : `${file.size / 1000}`.slice(0, 5) + " Кб"}
      </div>
    </div>
  );
};

export default File;
