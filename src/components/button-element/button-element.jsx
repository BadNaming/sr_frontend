import styles from "./button-element.module.css";
import {
  TYPE_BTN_TRY,
  TYPE_BTN_SIGN_IN,
  TYPE_BTN_REGISTER,
  TYPE_BTN_RESTORE,
  TYPE_BTN_ADD,
  TYPE_BTN_EDIT,
  TYPE_BTN_REPORT_GO,
  TYPE_BTN_REPORT_MAKE,
  TYPE_BTN_REPORT_SETTINGS,
  TYPE_BTN_REPORT_DOWNLOAD,
  TYPE_BTN_SAVE,
  TEXT_BTN_TRY,
  TEXT_BTN_SIGN_IN,
  TEXT_BTN_RESTORE,
  TEXT_BTN_REGISTER,
  TEXT_BTN_REPORT_GO,
  TEXT_BTN_REPORT_MAKE,
  TEXT_BTN_REPORT_SETTINGS,
  TEXT_BTN_REPORT_DOWNLOAD,
  TEXT_BTN_SAVE,
  TEXT_BTN_EDIT
} from "../../utils/constants";
import { useEffect, useState } from "react";

const ButtonElement = ({ type, onClick, onMouseEnter, onMouseLeave }) => {
  const [textBtn, setTextBtn] = useState("");
  const [styleBtn, setStyleBtn] = useState(`${styles.btn}`);

  useEffect(() => {
    handleStyleBtn()
  }, [type]);

  const handleStyleBtn = () => {
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
      case TYPE_BTN_ADD:
        setTextBtn("");
        setStyleBtn(`${styles.btn_connect} ${styles.btn_add}`);
        break;
      case TYPE_BTN_REPORT_GO:
        setTextBtn(TEXT_BTN_REPORT_GO);
        setStyleBtn(`${styles.btn} ${styles.btn_theme_grey}`);
        break;
      case TYPE_BTN_REPORT_MAKE:
        setTextBtn(TEXT_BTN_REPORT_MAKE);
        setStyleBtn(`${styles.btn} ${styles.btn_theme_blue}`);
        break;
      case TYPE_BTN_REPORT_SETTINGS:
        setTextBtn(TEXT_BTN_REPORT_SETTINGS);
        setStyleBtn(`${styles.btn} ${styles.btn_theme_transparent}`);
        break;
      case TYPE_BTN_REPORT_DOWNLOAD:
        setTextBtn(TEXT_BTN_REPORT_DOWNLOAD);
        setStyleBtn(`${styles.btn} ${styles.btn_theme_blue}`);
        break;
      case TYPE_BTN_SAVE:
        setTextBtn(TEXT_BTN_SAVE);
        setStyleBtn(`${styles.btn} ${styles.btn_theme_blue}`);
        break;
      case TYPE_BTN_EDIT:
        setTextBtn(TEXT_BTN_EDIT);
        setStyleBtn(`${styles.btn} ${styles.btn_theme_blue}`);
        break;
      default:
        return;
    }
  }

  return (
    <>
      <button
        className={styleBtn}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {textBtn}
      </button>
    </>
  );
};

export default ButtonElement;
