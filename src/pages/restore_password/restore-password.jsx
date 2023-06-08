import globalStyles from '../../components/global-styles.module.css';
import InputElement from '../../components/input-element/input-element';
import Button from '../../components/button/button';
import { TYPE_INPUT_EMAIL, TYPE_BTN_RESTORE } from '../../utils/constants';

const RestorePassword = () => {
  return (
    <>
      <form className={globalStyles.form}>
        <fieldset className={globalStyles.fieldset}>
          <InputElement type={TYPE_INPUT_EMAIL} />
        </fieldset>
        <Button type={TYPE_BTN_RESTORE} />
      </form>
    </>
  )
};

export default RestorePassword;
