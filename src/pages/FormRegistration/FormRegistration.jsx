import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo2.png"
import styles from "./formRegistration.module.scss";

const FormRegistration = () => {
  return (
    <div className={styles.main}>
      <img src={logo} alt="logo" />
      <h1>Apposible</h1>
      <Link to="/signin">
        <button className={styles.signin}>Войти</button>
      </Link>
      <Link to="/signup">
        <button className={styles.signup}>Зарегистрироваться</button>
      </Link>
    </div>
  );
};

export default FormRegistration;
