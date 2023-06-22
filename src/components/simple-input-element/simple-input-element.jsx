import { useEffect, useState } from "react";
import styles from "./simple-input-element.module.css";
import {
  TYPE_INPUT_CLIENT_ID,
  TEXT_PLACEHOLDER_CLIENT_ID,
  TYPE_INPUT_CLIENT_SECRET,
  TEXT_PLACEHOLDER_CLIENT_SECRET
} from "../../utils/constants";

const SimpleInputElement = ({ type, value, onChange }) => {
  const [placeholder, setPlaceholder] = useState(`${type}`);
  const [classInput, setClassInput] = useState(`${styles.input}`);

  useEffect(() => {
    handlePlaceholderInput();
  }, []);


  const handlePlaceholderInput = () => {
    switch (type) {
      case TYPE_INPUT_CLIENT_ID:
        setPlaceholder(TEXT_PLACEHOLDER_CLIENT_ID);
        setClassInput(`${styles.input}`);
        break;
      case TYPE_INPUT_CLIENT_SECRET:
        setPlaceholder(TEXT_PLACEHOLDER_CLIENT_SECRET);
        setClassInput(`${styles.input}`);
        break;
      default:
        return;
    }
  };


  return (
    <>
      <input
        id={type}
        name={type}
        type="text"
        placeholder={placeholder}
        className={classInput}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default SimpleInputElement;
