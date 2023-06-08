import styles from "./button.module.css";
import {
  TEXT_BTN_TRY,
  TYPE_BTN_TRY,
  TYPE_BTN_SIGN_IN,
  TYPE_BTN_REGISTER,
  TEXT_BTN_SIGN_IN,
  TYPE_BTN_RESTORE,
  TEXT_BTN_RESTORE,
  TEXT_BTN_REGISTER,
} from "../../utils/constants";
import { useEffect, useState } from "react";

const Button = ({ type }) => {
  const [textBtn, setTextBtn] = useState("");
  const [styleBtn, setStyleBtn] = useState(`${styles.btn}`);

  useEffect(() => {
    switch (type) {
      case TYPE_BTN_TRY:
        setTextBtn(TEXT_BTN_TRY);
        setStyleBtn(`${styles.btn} ${styles.btn_try}`);
        break;
      case TYPE_BTN_SIGN_IN:
        setTextBtn(TEXT_BTN_SIGN_IN);
        setStyleBtn(`${styles.btn} ${styles.btn_theme_blue}`);
        break;
      case TYPE_BTN_RESTORE:
        setTextBtn(TEXT_BTN_RESTORE);
        setStyleBtn(`${styles.btn} ${styles.btn_theme_blue}`);
        break;
      case TYPE_BTN_REGISTER:
        setTextBtn(TEXT_BTN_REGISTER);
        setStyleBtn(`${styles.btn} ${styles.btn_theme_blue}`);
        break;
      default:
        return;
    }
  }, []);

  return (
    <>
      <button className={styleBtn}>{textBtn}</button>
    </>
  );
};

export default Button;
