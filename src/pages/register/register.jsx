import styles from "./register.module.css";
import InputElement from "../../components/input-element/input-element";
import Button from "../../components/button/button";
import {
  TYPE_BTN_SIGN_IN,
  TYPE_INPUT_PASSWORD,
  TYPE_INPUT_EMAIL,
  TYPE_INPUT_NAME,
  TYPE_INPUT_PHONE,
  TYPE_INPUT_PASSWORD_SECOND,
} from "../../utils/constants";

const Register = () => {
  return (
    <>
      <form className={styles.form}>
        <fieldset className={styles.field_group}>
          <InputElement type={TYPE_INPUT_NAME} />
        </fieldset>
        <fieldset className={styles.field_group}>
          <InputElement type={TYPE_INPUT_PHONE} />
        </fieldset>
        <fieldset className={styles.field_group}>
          <InputElement type={TYPE_INPUT_EMAIL} />
        </fieldset>
        <fieldset className={styles.field_group}>
          <InputElement type={TYPE_INPUT_PASSWORD} />
        </fieldset>
        <fieldset className={styles.field_group}>
          <InputElement type={TYPE_INPUT_PASSWORD_SECOND} />
        </fieldset>
        <Button type={TYPE_BTN_SIGN_IN} />
      </form>
    </>
  );
};

export default Register;
