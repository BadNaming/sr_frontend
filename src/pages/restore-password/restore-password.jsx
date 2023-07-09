import InputElement from '../../components/input-element/input-element';
import ButtonElement from '../../components/button-element/button-element';
import { TYPE_INPUT_EMAIL, TYPE_BTN_RESTORE } from '../../utils/constants';

const RestorePassword = () => {

  const handleRestorePassword = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form onClick={handleRestorePassword}>
        <fieldset>
          <InputElement type={TYPE_INPUT_EMAIL} />
        </fieldset>
        <ButtonElement type={TYPE_BTN_RESTORE}/>
      </form>
    </>
  )
};

export default RestorePassword;
