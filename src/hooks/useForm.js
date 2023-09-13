import { useCallback, useEffect, useState } from 'react'

export function useForm(inputValues) {
  const [values, setValues] = useState(inputValues)
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)

  /** изменения в input */
  const handleChange = (e) => {
    const { value, name } = e.target
    setValues({ ...values, [name]: value })
    setErrors({ ...errors, [name]: e.target.validationMessage })
    setIsValid(e.target.closest('form').checkValidity())
  }

  return {
    values,
    setValues,
    handleChange,
    errors,
    isValid
  }
}

//хук управления формой и валидации формы
export function useFormWithValidation(inputValues, customHandlers) {
  const [values, setValues] = useState({ inputValues })
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    checkValues()
  }, [values])

  const checkValues = () => {
    console.log(isValid)
    const validationErrors = {}
    if (customHandlers) {
      Object.keys(values).forEach((key) => {
        const value = values[key]
        const validator = customHandlers && customHandlers[key]
        if (validator) {
          validationErrors[key] = validator(value)
        }
      })
    }
    setErrors(validationErrors)
    setIsValid(Object.keys(validationErrors).length === 0)
  }

  const handleChange = (event) => {
    const { value, name } = event.target
    console.log(event.target)
    setValues({ ...values, [name]: value })
    setErrors({ ...errors, [name]: event.target.validationMessage })
  }

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues)
      setErrors(newErrors)
      setIsValid(newIsValid)
    },
    [setValues, setErrors, setIsValid]
  )

  return {
    values,
    setValues,
    handleChange,
    errors,
    isValid,
    resetForm
  }
}
