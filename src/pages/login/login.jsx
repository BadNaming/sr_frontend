import ButtonElement from '../../components/button-element/button-element';
import InputElement from "../../components/input-element/input-element";
import {
  TYPE_BTN_SIGN_IN,
  TYPE_INPUT_EMAIL,
  TYPE_INPUT_PASSWORD,
  TYPE_INPUT_PHONE,
  TYPE_INPUT_NAME,
  TYPE_INPUT_LASTNAME
} from "../../utils/constants";
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { addUser } from '../../store/auth/authSlice';
import { useRegisterUserMutation } from '../../store/auth/services/auth';


const Login = () => {
  const [registerUser, { isError, isLoading, isSuccess }] = useRegisterUserMutation()
  const dispatch = useDispatch();
  const { values, handleChange, isValid } = useForm(
    { first_name: "", last_name: "", phone: "", email: "", password: "" }
  );



  const handleSubmint = async (e) => {
    e.preventDefault();
    console.log(values)
    const user = await registerUser({
      first_name: values.first_name,
      last_name: values.last_name,
      phone_number: values.phone,
      email: values.email,
      password: values.password
    })
    console.log(user)
    isValid && dispatch(addUser())
  };

  return (
    <form onSubmit={handleSubmint}>
      <fieldset>
        <InputElement type={TYPE_INPUT_EMAIL} value={values.email} onChange={handleChange} />
      </fieldset>
      <fieldset>
        <InputElement type={TYPE_INPUT_NAME} value={values.first_name} onChange={handleChange} />
      </fieldset>
      <fieldset>
        <InputElement type={TYPE_INPUT_LASTNAME} value={values.last_name} onChange={handleChange} />
      </fieldset>
      <fieldset>
        <InputElement type={TYPE_INPUT_PHONE} value={values.phone_number} onChange={handleChange} />
      </fieldset>
      <fieldset>
        <InputElement type={TYPE_INPUT_PASSWORD} value={values.password} onChange={handleChange} />
      </fieldset>

      <ButtonElement type={TYPE_BTN_SIGN_IN} />
    </form>
  );
};

export default Login;
