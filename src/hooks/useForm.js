import { useCallback, useState } from 'react'

export function useForm(inputValues) {
  const [values, setValues] = useState(inputValues)
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)

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

export function useFormWithValidation(inputValues, customHandlers) {
  const [values, setValues] = useState(inputValues)
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)

  const handleChange = async (event) => {
    const target = event.target
    const name = target.name
    const value = target.value

    setValues((prevValues) => ({ ...prevValues, [name]: value }))

    const newErrors = {}

    const form = target.closest('form')
    const formElements = Array.from(form.elements).filter(
      (element) => element.tagName === 'INPUT'
    )

    formElements.forEach((element) => {
      if (!element.checkValidity()) {
        newErrors[element.name] = element.validationMessage
      }
    })

    for (const key of Object.keys(customHandlers)) {
      const customError = customHandlers[key]({ ...values, [name]: value })
      if (customError) {
        newErrors[key] = customError
      }
    }
    setErrors({ ...newErrors })
    setIsValid(Object.keys(newErrors).length === 0)
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
    handleChange,
    errors,
    isValid,
    resetForm
  }
}
