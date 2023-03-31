import React, { useEffect } from "react";
import styles from "./file.module.scss";
import { BsFiletypeHtml } from "react-icons/bs";
import { BsFiletypeScss } from "react-icons/bs";
import { BsFiletypeTxt } from "react-icons/bs";
import { BsFiletypeXlsx } from "react-icons/bs";
import { BsFiletypePhp } from "react-icons/bs";
import { SiJavascript } from "react-icons/si";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { AiFillFileImage } from "react-icons/ai";
import { AiOutlineFilePdf } from "react-icons/ai";
import { AiFillFileWord } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { FaFilePowerpoint } from "react-icons/fa";
import { FaRegFileArchive } from "react-icons/fa";
import { FaFileDownload } from "react-icons/fa";
import { FaPython } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFile,
  downloadFile,
  fetchFile,
} from "../../../../features/fileSlice";
import { useParams } from "react-router-dom";

const File = ({ file }) => {
  const { id } = useParams();
  const image = ["img", "jpeg", "jpg", "svg", "png"];
  const dispatch = useDispatch();

  const handleOpenDir = () => {
    dispatch(fetchFile({ parent: file._id, room: id }));
    localStorage.setItem("dir", file._id);
  };

  const handleDownLoad = (e) => {
    e.stopPropagation();
    dispatch(downloadFile({ file, room: id }));
  };

  const handleDelete = (e) => {
    dispatch(deleteFile({ file, room: id }));
  };

  return (
    <div
      className={
        file.type !== "dir" ? styles.file : `${styles.file} ${styles.dir}`
      }
      onClick={file.type === "dir" ? () => handleOpenDir() : null}
    >
      <div className={styles.name}>
        {file.type === "dir" && <AiTwotoneFolderOpen size={22} />}
        {file.type === "html" && <BsFiletypeHtml size={22} />}
        {file.type === "css" && <BsFiletypeScss size={22} />}
        {file.type === "js" && <SiJavascript size={22} />}
        {file.type === "pptx" && <FaFilePowerpoint size={22} />}
        {file.type === "docx" && <AiFillFileWord size={22} />}
        {file.type === "xlsx" && <BsFiletypeXlsx size={22} />}
        {file.type === "txt" && <BsFiletypeTxt size={22} />}
        {file.type === "rar" && <FaRegFileArchive size={22} />}
        {file.type === "pdf" && <AiOutlineFilePdf size={22} />}
        {file.type === "py" && <FaPython size={22} />}
        {file.type === "php" && <BsFiletypePhp size={22} />}

        {image.includes(file.type) && <AiFillFileImage size={22} />}
        <span>{file.name}</span>
      </div>
      <div className={styles.date}>
        {file.date?.slice(0, 10).replace(/[-/]/g, ".")}
      </div>
      <div className={styles.size}>
        {file.size >= 1000000
          ? `${file.size / 1000000}`.slice(0, 5) + " Мб"
          : `${file.size / 1000}`.slice(0, 5) + " Кб"}
      </div>
      <div className={styles.buttons}>
        {file.type !== "dir" && (
          <button>
            <FaFileDownload onClick={handleDownLoad} size={22} />
          </button>
        )}
        <button>
          <AiFillDelete onClick={handleDelete} size={24} />
        </button>
      </div>
    </div>
  );
};

export default File;
