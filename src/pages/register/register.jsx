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
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [createUser, { isLoading, isError, isSuccess, error: userErrors, data: userData }] =
    useRegisterUserMutation()
  const [getToken, { isLoading: isLoadingToken, isError: isErrorToken, isSuccess: isSuccessToken, data: tokenData }] =
    useGetTokenMutation()
  const [validationErrors, setValidationErrors] = useState([])
  const [submittionErrors, setSubmittionErrors] = useState([])

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

  useEffect(() => {
    if (userData && "email" in userData) {
      getToken({ email: userData.email, password: values.password })
    }
  }, [getToken, userData, values.password]
  )

  useEffect(() => {
    if (isSuccessToken && tokenData) {
      console.log(tokenData)
      localStorage.setItem(`${APP_NAME}Token`, tokenData.auth_token)
      dispatch(addUser({ ...userData, token: tokenData.auth_token }))
      navigate('/cabinet')
    }
  }, [isSuccessToken, tokenData, dispatch, userData]
  )

  useEffect(() => {
    const totalErrors = []
    Object.keys(errors).map((error) => {
      totalErrors.push(errors[error])
    })
    setValidationErrors(totalErrors)
  }, [errors])

  useEffect(() => {
    if (isError && 'data' in userErrors) {
      const errors = []
      Object.keys(userErrors.data).map((error) => {
        userErrors.data[error].map((err) => {
          errors.push(err)
        }
        )
      })
      setSubmittionErrors(errors)
    }
  }, [isError, userErrors])

  const handleRegister = async (e) => {
    e.preventDefault()
    if (isValid) {
      await createUser(values)
    }
  }

  return (
    <>
      <form onClick={handleRegister}>
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
        {validationErrors.length > 0 && validationErrors.map((error, index) => {
          return <p style={{ margin: "4px" }} key={index}>{error}</p>
        }
        )}
        {submittionErrors.length > 0 && submittionErrors.map((error, index) => {
          return <p style={{ margin: "4px" }} key={index}>{error}</p>
        }
        )}
        <ButtonElement disabled={!isValid} type={TYPE_BTN_REGISTER} />
      </form>
    </>
  )
}

export default Register
