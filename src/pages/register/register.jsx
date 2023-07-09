import InputElement from "../../components/input-element/input-element";
import ButtonElement from "../../components/button-element/button-element";
import {
  TYPE_BTN_REGISTER,
  TYPE_INPUT_PASSWORD,
  TYPE_INPUT_EMAIL,
  TYPE_INPUT_NAME,
  TYPE_INPUT_PHONE,
  TYPE_INPUT_PASSWORD_SECOND,
} from "../../utils/constants";

const Register = () => {

  const handleRegister = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form onClick={handleRegister}>
        <fieldset>
          <InputElement type={TYPE_INPUT_NAME} />
        </fieldset>
        <fieldset>
          <InputElement type={TYPE_INPUT_PHONE} />
        </fieldset>
        <fieldset>
          <InputElement type={TYPE_INPUT_EMAIL} />
        </fieldset>
        <fieldset>
          <InputElement type={TYPE_INPUT_PASSWORD} />
        </fieldset>
        <fieldset>
          <InputElement type={TYPE_INPUT_PASSWORD_SECOND} />
        </fieldset>
        <ButtonElement type={TYPE_BTN_REGISTER}/>
      </form>
    </>
  );
};

export default Register;
