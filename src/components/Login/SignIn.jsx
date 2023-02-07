import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authSignIn } from "../../features/applicationSlice";
import styles from "./signin.module.scss";
import logo from "../../images/logo2.png";
import arrow from "../../images/arrow-left.png";
import { motion } from "framer-motion";

const SignIn = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [text, setText] = useState(true);
  const [iconPassword, setIconPassword] = useState(true);

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    setLogin(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setPassword("");
    setLogin("");
    dispatch(authSignIn({ login, password }));
    navigate("/");
  };

  const handleClick = () => {
    setText(!text);
    setIconPassword(!iconPassword);
  };

  return (
    <div className={styles.container}>
      <div className={styles.block_signIn}>
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
          <h1>Войти</h1>
          <form onSubmit={handleSignUp} className={styles.form_signIn}>
            <input
              autoComplete="on"
              type="text"
              value={login}
              placeholder="Логин"
              onChange={(e) => handleLogin(e)}
              className={styles.input4}
            />
            <input
              autoComplete="on"
              type={text ? "password" : "text"}
              value={password}
              placeholder="Пароль"
              onChange={(e) => handlePassword(e)}
              className={styles.input5}
            />
            <img
              src={
                iconPassword
                  ? "https://cdn-icons-png.flaticon.com/512/159/159604.png"
                  : "https://cdn-icons-png.flaticon.com/512/7615/7615155.png"
              }
              alt="#"
              className={styles.eyeForPasswor}
              onClick={handleClick}
            />

            <button type="submit" className={styles.btn}>
              ВХОД
            </button>
          </form>
          <div className={styles.link}>
            <Link to="/signup" className={styles.l}>
              Нет аккаунта ?
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn;
