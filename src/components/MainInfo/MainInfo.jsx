import React from "react";
import styles from "./maininfo.module.scss";
import { motion } from "framer-motion";

const MainInfo = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.img_block}>
          <motion.img
            initial={{ opacity: 0, transform: "scale(0)" }}
            whileInView={{ opacity: 1, transform: "scale(1)" }}
            transition={{ duration: 2.5 }}
            src={require("../../images/info.png")}
            alt="#"
          />
        </div>
        <motion.p
          initial={{ opacity: 0, x: 400 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 2 }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, officia
          blanditiis! Facilis quo porro voluptatum, consequuntur aliquam itaque
          corrupti at excepturi ipsa rem officiis et maxime soluta laborum
          praesentium vel.
        </motion.p>
      </div>
      <div className={styles.container}>
        <motion.p
          initial={{ opacity: 0, y: 400 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, officia
          blanditiis! Facilis quo porro voluptatum, consequuntur aliquam itaque
          corrupti at excepturi ipsa rem officiis et maxime soluta laborum
          praesentium vel.
        </motion.p>
        <div className={styles.img_block}>
          <motion.img
            initial={{ opacity: 0, y: 400 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            src={require("../../images/info.png")}
            alt="#"
          />
        </div>
      </div>
    </>
  );
};

export default MainInfo;
