import globalStyles from '../../components/global-styles.module.css';
import ButtonElement from '../../components/button-element/button-element';
import InputElement from "../../components/input-element/input-element";
import {
  TYPE_BTN_SIGN_IN,
  TYPE_INPUT_EMAIL,
  TYPE_INPUT_PASSWORD,
} from "../../utils/constants";

const Login = () => {

  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <form className={globalStyles.form} onClick={handleLogin}>
      <fieldset className={globalStyles.fieldset}>
        <InputElement type={TYPE_INPUT_EMAIL} />
      </fieldset>
      <fieldset className={globalStyles.fieldset}>
        <InputElement type={TYPE_INPUT_PASSWORD} />
      </fieldset>
      <ButtonElement type={TYPE_BTN_SIGN_IN}/>
    </form>
  );
};

export default Login;
