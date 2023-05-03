import React from "react";
import styles from "./maininfo.module.scss";
import { motion } from "framer-motion";
import word from "../../images/word.svg";
import excel from "../../images/excel.svg";
import powerpoint from "../../images/powerpoint.svg";

const MainInfo = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.img_block_1}>
          <motion.img
            initial={{ opacity: 0, transform: "scale(0)" }}
            whileInView={{ opacity: 1, transform: "scale(1)" }}
            transition={{ duration: 1.5 }}
            src={word}
            alt="#"
          />
          <motion.img
            initial={{ opacity: 0, transform: "scale(0)" }}
            whileInView={{ opacity: 1, transform: "scale(1)" }}
            transition={{ duration: 1.5, delay: 0.5 }}
            src={excel}
            alt="#"
          />
          <motion.img
            initial={{ opacity: 0, transform: "scale(0)" }}
            whileInView={{ opacity: 1, transform: "scale(1)" }}
            transition={{ duration: 1.5, delay: 1 }}
            src={powerpoint}
            alt="#"
          />
        </div>
        <motion.p
          initial={{ opacity: 0, x: -400 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, delay: 2 }}
        >
          Возможность работать и сохранять файлы различных форматов, в числе
          которых самые популярные приложения как Word, Excel, PowerPoint и
          другие.
        </motion.p>
      </div>
      <div className={styles.container}>
        <p
          
        >
          Хотите работать в команде и всегда оставаться на связи?
          <br />
          <br />
          Не проблема! Вы можете комментировать свои действия, общаться с
          командой, делиться ходом работы и просто общаться
        </p>
        <div className={styles.img_block_2}>
          <img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.8 }}
            src={require("../../images/team_image.png")}
            alt="#"
          />
        </div>
      </div>
    </>
  );
};

export default MainInfo;
