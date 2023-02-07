import React, { useLayoutEffect, useRef } from "react";
import styles from "./mainPage.module.scss";
import logo from "../../images/logo.png";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import ScrollTrigger from "gsap/ScrollTrigger";
import MainInfo from "../../components/MainInfo/MainInfo";
import Footer from "../../components/Footer/Footer";

gsap.registerPlugin(ScrollTrigger);

const MainPage = () => {
  const titleRef = useRef();
  const logoRef = useRef();
  const headRef = useRef();
  const logoBlock = useRef();
  const containerRef = useRef();

  useLayoutEffect(() => {
    gsap.from(logoRef.current, {
      transform: "scale(0.75)",
    });
    gsap.to(logoRef.current, {
      transform: "scale(1.2)",
      repeat: false,
      duration: 2,
      delay: 1,
    });

    gsap.from(headRef.current, {
      transform: "scale(0.85)",
    });
    gsap.to(headRef.current, {
      transform: "scale(1)",
      repeat: false,
      duration: 2,
      delay: 2,
    });

    gsap.to(logoBlock.current, {
      position: "sticky",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "center center",
        end: "center center",
        scrub: true,
      },
    });
    gsap.from(logoBlock.current, {
      transform: "scale(0.9)",
    });
    gsap.to(logoBlock.current, {
      transform: "scale(1)",
      repeat: false,
      duration: 3,
      delay: 2,
    });

    gsap.to(titleRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "center center",
        end: "center 200px",
        scrub: true,
      },
      opacity: 1,
      transform: "scale(1)",
      duration: 3,
    });
  }, []);

  return (
    <>
      <div className={styles.main}></div>
      <div className={styles.container_main} ref={containerRef}>
        <div className={styles.logo} ref={logoBlock}>
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 2 }}
            ref={logoRef}
            src={logo}
            id={styles.logo}
            alt="marine logo"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 2 }}
            ref={headRef}
            id={styles.logo_text}
            alt="marine breeze"
          >
            Apposible
          </motion.p>
          <p className={styles.title} ref={titleRef}>
            Apposible - сервис на котором вы можете работать с файлами в команде
            и не переживать за их сохранность, вы спокойно можете связываться с
            участниками команды как по видео звонкам, так и воспользовавшись
            чатом
          </p>
        </div>
      </div>
      <MainInfo />
      <Footer />
    </>
  );
};

export default MainPage;
