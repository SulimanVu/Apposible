import React from "react";
import styles from "../Header/header.module.scss"

const Footer = () => {
  return (
    <footer>
      <ul className={styles.trend}>
        <h2>Trending Links</h2>
        <li>Class Shedules</li>
        <li>Apply Online</li>
        <li>Programs</li>
      </ul>
      <ul className={styles.contact}>
        <h2>Contact Us</h2>
        <li>Community College</li>
        <li>Springfield</li>
        <li>+7(906) 525-34-97</li>
      </ul>
      <div className={styles.follow}>
        Follow Us
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
