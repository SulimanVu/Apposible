import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authSignUp } from "../../features/applicationSlice";
import styles from "./signup.module.scss";
import logo from "../../images/logo2.png";
import { Link } from "react-router-dom";
import arrow from "../../images/arrow-left.png";
import { motion } from "framer-motion";

const SignUp = () => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [text, setText] = useState(true);
  const [iconPassword, setIconPassword] = useState(true);

  const dispatch = useDispatch();

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleMail = (e) => {
    setMail(e.target.value);
  };

  const handleLogin = (e) => {
    setLogin(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUp = (e) => {
    dispatch(authSignUp({ name, email: mail, login, password }));
    e.preventDefault();
    setPassword("");
    setName("");
    setMail("");
    setLogin("");
  };

  const handleClick = () => {
    setText(!text);
    setIconPassword(!iconPassword);
  };

  return (
    <div className={styles.container}>
      <div className={styles.block_signUp}>
        <motion.div
          className={styles.block_two}
          initial={{ y: -500, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <img src={logo} alt="logo" />
          <Link to="/login" className={styles.link}>
            <img src={arrow} alt="return" />
          </Link>
          <h1>Авторизоваться</h1>
          <form onSubmit={handleSignUp} className={styles.form_signUp}>
            <input
              autoComplete="on"
              type="text"
              value={name}
              placeholder="Имя"
              onChange={(e) => handleName(e)}
            />
            <input
              autoComplete="on"
              type="email"
              value={mail}
              placeholder="Mail"
              onChange={(e) => handleMail(e)}
            />
            <input
              autoComplete="on"
              type="text"
              value={login}
              placeholder="Логин"
              onChange={(e) => handleLogin(e)}
            />
            <input
              autoComplete="on"
              type={text ? "password" : "text"}
              value={password}
              placeholder="Пароль"
              onChange={(e) => handlePassword(e)}
            />
            <img
              src={
                iconPassword
                  ? "https://cdn-icons-png.flaticon.com/512/159/159604.png"
                  : "https://cdn-icons-png.flaticon.com/512/7615/7615155.png"
              }
              alt="#"
              className={styles.eyeForPassword}
              onClick={handleClick}
            />

            <button type="submit" className={styles.btn}>
              РЕГИСТРАЦИЯ
            </button>
          </form>
          <div className={styles.link}>
            <Link to="/signin" className={styles.l}>
              Есть аккаунт ?
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
