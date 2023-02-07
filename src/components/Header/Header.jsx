import React from "react";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../images/logo2.png";

const Header = () => {
  const id = useSelector((state) => state.application.userId);
  const token = useSelector((state) => state.application.token);

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
            <Link to="/chat" className={styles.link}>
              <li>Chat</li>
            </Link>
          ) : (
            <li className={styles.link_off}>Чат</li>
          )}

          {token ? (
            <Link to={"#"} className={styles.link}>
              <li>profile</li>
            </Link>
          ) : (
            <li className={styles.link_off}>profile</li>
          )}
          
          <Link to="/login" className={styles.link}>
            <li className={styles.link_mg}>sign in / sign up</li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
