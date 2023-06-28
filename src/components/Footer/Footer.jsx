import React from "react";
import styles from "../Header/header.module.scss"

const Footer = () => {
  return (
    <footer>
      <ul className={styles.trend}>
        <h2>Трендовые ссылки</h2>
        <li>Подписки</li>
        <li>Онлафн оплата</li>
        <li>Программы</li>
      </ul>
      <ul className={styles.contact}>
        <h2>Контактные данные</h2>
        <li>sssuliman@bk.ru</li>
        <li>havagapaeva@mail.ru</li>
        <li>+7 (906) 525-34-97</li>
      </ul>
      <div className={styles.follow}>
        Подпишись на нас
        <ul>
          <li>
            <a href="#">
              <img src={require("../../images/facebook.png")} alt="#" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src={require("../../images/linkedin.png")} alt="#" />
            </a>
          </li>
          <li>
            <a href="https://telegram.me/frontend_develope" target="_blank">
              <img src={require("../../images/telegram.png")} alt="#" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src={require("../../images/twitter.png")} alt="#" />
            </a>
          </li>
          <li>
            <a
              href="https://api.whatsapp.com/send?phone={{89065253497}}"
              target="_blank"
            >
              <img src={require("../../images/whatsapp.png")} alt="#" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
