import { useEffect, useState, useCallback } from "react";
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
  TEXT_PLACEHOLDER_ERROR,
  TEXT_SPAN_PHONE,
  TEXT_ICON_PASSWORD,
  TEXT_PLACEHOLDER_LASTNAME,
  TYPE_INPUT_LASTNAME,
} from "../../utils/constants";
import imgShowPassword from "../../images/icon_show_password.svg";
import imgHisePassword from "../../images/icon_hide_password.svg";

const InputElement = ({ name, inputType, value, onChange }) => {
  const { values, handleChange, errors } = useForm("");
  const [placeholder, setPlaceholder] = useState(`${name}`);
  const [isShowTextPassword, setIsShowTextPassword] = useState(true);
  const [iconPassword, setIconPassword] = useState(imgShowPassword);
  const [classInput, setClassInput] = useState(`${styles.input}`);
  const [classLabel, setClassLabel] = useState(`${styles.label}`);
  const [classError, setClassError] = useState(`${styles.span}`);
  const [error, setError] = useState('');

  useEffect(() => {
    handlePlaceholderInput();
  }, []);

  useEffect(() => {
    showLabel();
  }, [values]);

  useEffect(() => {
    showError();
  }, [errors]);


  /** установка текста, стиля в зависимости от типа поля input */
  const handlePlaceholderInput = () => {
    switch (name) {
      case TYPE_INPUT_PASSWORD:
        setPlaceholder(TEXT_PLACEHOLDER_PASSWORD);
        setClassInput(`${styles.input} ${styles.input_hide}`);
        break;
      case TYPE_INPUT_NAME:
        setPlaceholder(TEXT_PLACEHOLDER_NAME);
        break;
      case TYPE_INPUT_LASTNAME:
        setPlaceholder(TEXT_PLACEHOLDER_LASTNAME);
        break;
      case TYPE_INPUT_PHONE:
        setPlaceholder(TEXT_PLACEHOLDER_PHONE);
        setError(TEXT_SPAN_PHONE)
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
  };

  /** показывать или скрывать иконку и текст пароля */
  const toggleShowPassword = () => {
    if (isShowTextPassword) {
      setIconPassword(imgHisePassword);
      setIsShowTextPassword(false);
      setClassInput(`${styles.input}`);
    } else {
      setIconPassword(imgShowPassword);
      setIsShowTextPassword(true);
      setClassInput(`${styles.input} ${styles.input_hide}`);
    }
  };

  /** показывать label если поле input заполненно */
  const showLabel = () => {
    values[name]
      ? setClassLabel(`${styles.label} ${styles.label_visible}`)
      : setClassLabel(`${styles.label}`);
  };

  /** показать ошибку если поле input не валидно */
  const showError = () => {
    if (errors[name]) {
      setPlaceholder(TEXT_PLACEHOLDER_ERROR);
      setClassLabel(
        `${styles.label} ${styles.label_visible} ${styles.label_error}`
      );
      setClassInput(`${styles.input} ${styles.input_error}`);
      setError(errors[name]);
      setClassError(`${styles.span} ${styles.span_error}`)
    } else {
      handlePlaceholderInput();
      showLabel();
      setClassInput(`${styles.input}`);
      name === TYPE_INPUT_PHONE ? setError(TEXT_SPAN_PHONE) : setError('');
      setClassError(`${styles.span}`)
    }
  };

  return (
    <>
      <input
        id={name}
        name={name}
        type={inputType === "password" ? (isShowTextPassword ? "password" : "text") : inputType}
        placeholder={placeholder}
        className={classInput}
        value={value}
        onChange={onChange}
      />
      <label htmlFor={inputType} className={classLabel}>
        {placeholder}
      </label>
      <span className={classError}>{error}</span>
      {(name === TYPE_INPUT_PASSWORD ||
        name === TYPE_INPUT_PASSWORD_SECOND) && (
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
