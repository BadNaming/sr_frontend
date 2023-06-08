import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import styles from "./input-element.module.css";
import {
  TYPE_INPUT_PASSWORD,
  TYPE_INPUT_PASSWORD_SECOND,
  TYPE_INPUT_NAME,
  TYPE_INPUT_PHONE,
  TYPE_INPUT_EMAIL,
  TEXT_PLACEHOLDER_EMAIL,
  TEXT_PLACEHOLDER_PASSWORD,
  TEXT_PLACEHOLDER_PASSWORD_SECOND,
  TEXT_PLACEHOLDER_NAME,
  TEXT_PLACEHOLDER_PHONE,
  TEXT_SPAN_PHONE,
  TEXT_ICON_PASSWORD,
  PATH_SIGN_IN
} from "../../utils/constants";
import imgShowPassword from "../../images/icon_show_password.svg";
import imgHisePassword from "../../images/icon_hide_password.svg";

const InputElement = ({ type }) => {
  const location = useLocation();
  const [placeholder, setPlaceholder] = useState(`${type}`);
  const { values, handleChange } = useForm("");
  const [isShow, setIsSgow] = useState(true);
  const [iconPassword, setIconPassword] = useState(imgShowPassword);
  const [classInput, setClassInput] = useState(`${styles.input}`);
  const [classLabel, setClassLabel] = useState(`${styles.label}`);

  useEffect(() => {
    switch (type) {
      case TYPE_INPUT_PASSWORD:
        setPlaceholder(TEXT_PLACEHOLDER_PASSWORD);
        setClassInput(`${styles.input} ${styles.input_hide}`);
        break;
      case TYPE_INPUT_NAME:
        setPlaceholder(TEXT_PLACEHOLDER_NAME);
        break;
      case TYPE_INPUT_PHONE:
        setPlaceholder(TEXT_PLACEHOLDER_PHONE);
        break;
      case TYPE_INPUT_EMAIL:
        setPlaceholder(TEXT_PLACEHOLDER_EMAIL);
        break;
      case TYPE_INPUT_PASSWORD_SECOND:
        setPlaceholder(TEXT_PLACEHOLDER_PASSWORD_SECOND);
        setClassInput(`${styles.input} ${styles.input_hide}`);
        break;
      default:
        return;
    }
  }, []);

  /** показывать или скрывать иконку и текст пароля */
  const toggleShowPassword = () => {
    if (isShow) {
      setIconPassword(imgHisePassword);
      setIsSgow(false);
      setClassInput(`${styles.input}`);
    } else {
      setIconPassword(imgShowPassword);
      setIsSgow(true);
      setClassInput(`${styles.input} ${styles.input_hide}`);
    }
  };

  /** показывать label если поле input заполненно */
  useEffect(() => {
    values
      ? setClassLabel(`${styles.label} ${styles.label_visible}`)
      : setClassLabel(`${styles.label}`);
  }, [values]);

  return (
    <>
      <input
        id={type}
        name={type}
        type="text"
        placeholder={placeholder}
        className={classInput}
        value={values.type}
        onChange={handleChange}
      />
      <label htmlFor={type} className={classLabel}>
        {placeholder}
      </label>
      {(type === TYPE_INPUT_PHONE) && (
        <span className={styles.span}>{TEXT_SPAN_PHONE}</span>
      )}
      {(type === TYPE_INPUT_PASSWORD || type === TYPE_INPUT_PASSWORD_SECOND) && (
        <img
          src={iconPassword}
          alt={TEXT_ICON_PASSWORD}
          className={styles.icon}
          onClick={toggleShowPassword}
        />
      )}
    </>
  );
};

export default InputElement;
