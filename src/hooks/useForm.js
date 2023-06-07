import { useState, useCallback } from "react";

export function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);

  /** изменения в input */
  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  return {
    values,
    setValues,
    handleChange,
  };
}

//хук управления формой и валидации формы
export function useFormWithValidation(customHandlers) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    if (customHandlers[name]) {
      event.target.setCustomValidity(customHandlers[name](value));
    }

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm
  };
}
