import { useState} from "react";

export function useForm(inputValues, inputDisabled) {
  const [values, setValues] = useState(inputValues);
  const [isDisabled, setIsDisabled] = useState(inputDisabled);
  const [isHiddenButton, setIsHiddenButton] = useState(true);

  /** изменения в input */
  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  /** клик по иконке  */
  const handleClickIcon = (e) => {
    e.preventDefault();
    const name = e.currentTarget.id;
    const key = name + "Disabled";
    setIsDisabled({ ...isDisabled, [key]: false });
    setIsHiddenButton(false);
  };

  return {
    values,
    setValues,
    handleChange,
    isDisabled,
    setIsDisabled,
    handleClickIcon,
    isHiddenButton,
    setIsHiddenButton,
  };
}
