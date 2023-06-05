import styles from './button.module.css';
import { TEXT_BTN_TRY, TYPE_BTN_TRY } from "../../utils/constants";
import { useEffect, useState } from 'react';

const Button = ({type}) => {
  const [textBtn, setTextBtn] = useState('');
  const [styleBtn, setStyleBtn] = useState(`${styles.btn}`)

  useEffect(()=>{
    switch(type){
      case TYPE_BTN_TRY:
        setTextBtn(TEXT_BTN_TRY);
        setStyleBtn(`${styles.btn} ${styles.btn_try}`)
        break;
        default: return
    }
  }, [])


  return(
    <>
      <button className={styleBtn}>{textBtn}</button>
    </>
  )
};

export default Button;
