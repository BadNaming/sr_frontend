import ButtonElement from '../../components/button-element/button-element'
import InputElement from '../../components/input-element/input-element'
import { useFormWithValidation } from '../../hooks/useForm'
import { useRegisterUserMutation } from '../../store/auth/services/auth'
import {
  TYPE_BTN_REGISTER,
  TYPE_INPUT_EMAIL,
  TYPE_INPUT_LASTNAME,
  TYPE_INPUT_NAME,
  TYPE_INPUT_PASSWORD,
  TYPE_INPUT_PASSWORD_SECOND,
  TYPE_INPUT_PHONE
} from '../../utils/constants'

const Register = () => {
  const [createUser, { isLoading, isError, isSuccess }] =
    useRegisterUserMutation()

  const passwordValidation = {
    password: (input) => {
      console.log('calling PasswordValidation')
      if (input !== values.password_second) {
        console.log(input, values.password_second)
        return 'passwords are not equal'
      } else {
        return null
      }
    }
  }

  const { values, handleChange, isValid, errors
  } = useFormWithValidation({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    password_second: ''
  },
    passwordValidation
  )


  const handleRegister = (e) => {
    e.preventDefault()
    if (isValid) {
      console.log(values)
    }
  }

  return (
    <>
      <form onClick={handleRegister}>
        {errors && <span>{errors.password}</span>}
        <fieldset>
          <InputElement type={TYPE_INPUT_NAME} value={values.firs_name} onChange={handleChange} />
        </fieldset>
        <fieldset>
          <InputElement type={TYPE_INPUT_LASTNAME} value={values.last_name} onChange={handleChange} />
        </fieldset>
        <fieldset>
          <InputElement type={TYPE_INPUT_PHONE} value={values.phone} onChange={handleChange} />
        </fieldset>
        <fieldset>
          <InputElement type={TYPE_INPUT_EMAIL} value={values.email} onChange={handleChange} />
        </fieldset>
        <fieldset>
          <InputElement type={TYPE_INPUT_PASSWORD} value={values.password} onChange={handleChange} />
        </fieldset>
        <fieldset>
          <InputElement type={TYPE_INPUT_PASSWORD_SECOND} value={values.password_second} onChange={handleChange} />
        </fieldset>
        <ButtonElement disabled={isValid} type={TYPE_BTN_REGISTER} />
      </form>
    </>
  )
}

export default Register
