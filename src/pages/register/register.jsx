import ButtonElement from '../../components/button-element/button-element'
import InputElement from '../../components/input-element/input-element'
import { useFormWithValidation } from '../../hooks/useForm'
import { useGetTokenMutation, useRegisterUserMutation } from '../../store/auth/services/auth'
import {
  TYPE_BTN_REGISTER,
  TYPE_INPUT_EMAIL,
  TYPE_INPUT_LASTNAME,
  TYPE_INPUT_NAME,
  TYPE_INPUT_PASSWORD,
  TYPE_INPUT_PASSWORD_SECOND,
  TYPE_INPUT_PHONE,
  APP_NAME
} from '../../utils/constants'

import { useDispatch } from 'react-redux'
import { addUser } from '../../store/auth/authSlice'

const Register = () => {
  const dispatch = useDispatch()
  const [createUser, { isLoading, isError, isSuccess }] =
    useRegisterUserMutation()
  const [getToken, { isLoading: isLoadingToken, isError: isErrorToken, isSuccess: isSuccessToken }] =
    useGetTokenMutation()


  const passwordValidation = {
    password: (values) => {
      if (values.password !== values.password_second) {
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
    phone_number: '',
    password: '',
    password_second: ''
  },
    passwordValidation
  )


  const handleRegister = async (e) => {
    e.preventDefault()
    if (isValid) {
      const user = await createUser(values)
      const token = await getToken({ email: user.data.email, password: values.password })
      if ('auth_token' in token.data) {
        localStorage.setItem(`${APP_NAME}Token`, token.data.auth_token)
        dispatch(addUser({ ...user.data, token: token.data.auth_token }))
      }
    }
  }

  return (
    <>
      <form onClick={handleRegister}>
        {errors && <span>{errors.password}</span>}
        <fieldset>
          <InputElement name={TYPE_INPUT_NAME} value={values.first_name} onChange={handleChange} />
        </fieldset>
        <fieldset>
          <InputElement name={TYPE_INPUT_LASTNAME} value={values.last_name} onChange={handleChange} />
        </fieldset>
        <fieldset>
          <InputElement inputType='tel' name={TYPE_INPUT_PHONE} value={values.phone_number} onChange={handleChange} />
        </fieldset>
        <fieldset>
          <InputElement inputType='email' name={TYPE_INPUT_EMAIL} value={values.email} onChange={handleChange} />
        </fieldset>
        <fieldset>
          <InputElement inputType='password' name={TYPE_INPUT_PASSWORD} value={values.password} onChange={handleChange} />
        </fieldset>
        <fieldset>
          <InputElement inputType='password' name={TYPE_INPUT_PASSWORD_SECOND} value={values.password_second} onChange={handleChange} />
        </fieldset>
        <ButtonElement disabled={!isValid} type={TYPE_BTN_REGISTER} />
      </form>
    </>
  )
}

export default Register
