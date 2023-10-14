import ButtonElement from '../../components/button-element/button-element';
import InputElement from "../../components/input-element/input-element";
import {
  APP_NAME,
  TYPE_BTN_SIGN_IN,
  TYPE_INPUT_EMAIL,
  TYPE_INPUT_PASSWORD,
} from "../../utils/constants";
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { addUser } from '../../store/auth/authSlice';
import { useGetTokenMutation, useGetUserDataQuery } from '../../store/auth/services/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch();
  const { values, handleChange, isValid } = useForm(
    { email: "", password: "" }
  );
  const [getToken, { isError: isErrorToken, isLoading: isLoadingToken, isSucces: isSuccessToken, data: tokenData }] = useGetTokenMutation()
  const { data: userData, isError: isErrorUserData, isLoading: isLoadingUserData, isSuccess: isSuccessUserData, refetch: refetchUserData } = useGetUserDataQuery()
  const navigate = useNavigate()

  useEffect(() => {
    if (tokenData) {
      localStorage.setItem(`${APP_NAME}Token`, tokenData.auth_token)
      refetchUserData()
    }
  }, [refetchUserData, tokenData])

  useEffect(() => {
    if (userData) {
      dispatch(addUser({ ...userData }))
      navigate('/cabinet')
    }
  }, [dispatch, navigate, userData])

  const handleSubmint = async (e) => {
    e.preventDefault();
    if (isValid) {
      getToken(values)
    }
  };

  return (
    <form onSubmit={handleSubmint}>
      <fieldset>
        <InputElement name={TYPE_INPUT_EMAIL} value={values.email} onChange={handleChange} />
      </fieldset>
      <fieldset>
        <InputElement name={TYPE_INPUT_PASSWORD} value={values.password} onChange={handleChange} />
      </fieldset>
      <ButtonElement type={TYPE_BTN_SIGN_IN} />
    </form>
  );
};

export default Login;
