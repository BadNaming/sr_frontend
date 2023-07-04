import globalStyles from '../../components/global-styles.module.css';
import ButtonElement from '../../components/button-element/button-element';
import InputElement from "../../components/input-element/input-element";
import {
  TYPE_BTN_SIGN_IN,
  TYPE_INPUT_EMAIL,
  TYPE_INPUT_PASSWORD,
} from "../../utils/constants";
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { addUser } from '../../store/auth';

const Login = () => {
  const dispatch = useDispatch();
  const { values, handleChange, isValid } = useForm(
    { email: "", password: "" }
  );

  const handleSubmint = (e) => {
    e.preventDefault();

    console.log('yes')
    // если форма валидна - добавить пользователя
    isValid && dispatch(addUser())
  };

  return (
    <form className={globalStyles.form} onSubmit={handleSubmint}>
      <fieldset className={globalStyles.fieldset}>
        <InputElement type={TYPE_INPUT_EMAIL} value={values.email} onChange={handleChange}/>
      </fieldset>
      <fieldset className={globalStyles.fieldset}>
        <InputElement type={TYPE_INPUT_PASSWORD} value={values.password} onChange={handleChange}/>
      </fieldset>
      <ButtonElement type={TYPE_BTN_SIGN_IN}/>
    </form>
  );
};

export default Login;
