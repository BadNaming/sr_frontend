import styles from './restore-password.module.css';
import InputElement from '../../components/input-element/input-element';
import Button from '../../components/button/button';
import { TYPE_INPUT_EMAIL, TYPE_BTN_RESTORE } from '../../utils/constants';

const RestorePassword = () => {
  return (
    <>
      <form className={styles.form}>
        <fieldset className={styles.field_group}>
          <InputElement type={TYPE_INPUT_EMAIL} />
        </fieldset>
        <Button type={TYPE_BTN_RESTORE} />
      </form>
    </>
  )
};

export default RestorePassword;
