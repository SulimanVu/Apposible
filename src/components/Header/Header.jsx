import React from "react";
import styles from "./header.module.scss";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../images/logo2.png";

const Header = () => {
  const params = useLocation();
  const token = useSelector((state) => state.application.token);
  const id = localStorage.getItem("id");

  const chat = params.pathname.includes("chat");
  const profile = params.pathname.includes("profile");
  
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className={styles.nav_top}>
        <ul>
          {token ? (
            <Link
              to="/chat"
              className={chat ? `${styles.link} ${styles.active}` : styles.link}
            >
              <li>Комната</li>
            </Link>
          ) : (
            <li className={styles.link_off}>Комната</li>
          )}

          {token ? (
            <Link
              to={`profile/${id}`}
              className={
                profile ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              <li>Профиль</li>
            </Link>
          ) : (
            <li className={styles.link_off}>Профиль</li>
          )}

          <Link to="/login" className={styles.link}>
            <li className={styles.link_mg}>Вход / Авторизация</li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
