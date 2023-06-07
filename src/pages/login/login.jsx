import styles from "./login.module.css";
import Button from "../../components/button/button";
import InputElement from "../../components/input-element/input-element";
import {
  TYPE_BTN_SIGN_IN,
  TYPE_INPUT_EMAIL,
  TYPE_INPUT_PASSWORD
} from "../../utils/constants";

const Login = () => {
  return (
    <form className={styles.form}>
      <fieldset className={styles.field_group}>
        <InputElement type={TYPE_INPUT_EMAIL} />
      </fieldset>
      <fieldset className={styles.field_group}>
        <InputElement type={TYPE_INPUT_PASSWORD} />
      </fieldset>
      <Button type={TYPE_BTN_SIGN_IN} />
    </form>
  );
};

export default Login;
