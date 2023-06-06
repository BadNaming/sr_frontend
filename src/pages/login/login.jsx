import styles from "./login.module.css";
import Button from "../../components/button/button";
import {
  TYPE_BTN_SIGN_IN,
  TEXT_PLACEHOLDER_EMAIL,
  TEXT_PLACEHOLDER_PASSWORD,
  TEXT_ICON_PASSWORD,
} from "../../utils/constants";
import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import imgShowPassword from "../../images/icon_show_password.svg";
import imgHisePassword from "../../images/icon_hide_password.svg";

const Login = () => {
  const [isShow, setIsSgow] = useState(true);
  const [iconPassword, setIconPassword] = useState(imgShowPassword);
  const [classPassword, setClassPassword] = useState(
    `${styles.input} ${styles.input_hide}`
  );
  const { values, handleChange } = useForm({ email: "", password: "" });

  /** показывать или скрывать иконку и текст пароля */
  const toggleShowPassword = () => {
    if (isShow) {
      setIconPassword(imgHisePassword);
      setIsSgow(false);
      setClassPassword(`${styles.input}`);
    } else {
      setIconPassword(imgShowPassword);
      setIsSgow(true);
      setClassPassword(`${styles.input} ${styles.input_hide}`);
    }
  };

  return (
    <form className={styles.form}>
      <fieldset className={styles.field_group}>
        <input
          id="email"
          name="email"
          type="text"
          placeholder={TEXT_PLACEHOLDER_EMAIL}
          className={styles.input}
          value={values.email}
          onChange={handleChange}
        ></input>
        <label htmlFor="email" className={styles.label}>
          {TEXT_PLACEHOLDER_EMAIL}
        </label>
      </fieldset>
      <fieldset className={styles.field_group}>
        <input
          id="password"
          name="password"
          type="text"
          placeholder={TEXT_PLACEHOLDER_PASSWORD}
          className={classPassword}
          value={values.password}
          onChange={handleChange}
        ></input>
        <label htmlFor="password" className={styles.label}>
          {TEXT_PLACEHOLDER_PASSWORD}
        </label>
        <img
          src={iconPassword}
          alt={TEXT_ICON_PASSWORD}
          className={styles.icon}
          onClick={toggleShowPassword}
        />
      </fieldset>
      <Button type={TYPE_BTN_SIGN_IN} />
    </form>
  );
};

export default Login;
