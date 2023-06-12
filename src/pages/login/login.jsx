import globalStyles from '../../components/global-styles.module.css';
import Button from "../../components/button/button";
import InputElement from "../../components/input-element/input-element";
import {
  TYPE_BTN_SIGN_IN,
  TYPE_INPUT_EMAIL,
  TYPE_INPUT_PASSWORD,
  PATH_REPORT_SHAPER
} from "../../utils/constants";
import { Link } from 'react-router-dom';

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
      <Button type={TYPE_BTN_SIGN_IN}/>
      <Link to={PATH_REPORT_SHAPER} style={{color: "red", padding: 10, border: '2 solid red'}}>СФОРМИРОВАТЬ ОТЧЕТ</Link>
    </form>
  );
};

export default Login;
