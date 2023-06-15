import { useEffect, useState } from 'react';
import styles from './icon-info.module.css';
import { TYPE_ICON_FILLED, TEXT_ICON_INFO, TYPE_ICON_FILLED_HELP } from '../../utils/constants';

const IconInfo = ({type, text}) => {
  const [classIcon, setClassIcon] = useState(`${styles.icon_img}`);
  const [textIcon, setTextIcon] = useState('');
  const [classSpan, setClassSpan] = useState(`${styles.span}`)

useEffect(()=>{
    switch (type) {
      case TYPE_ICON_FILLED:
        setClassIcon(`${styles.icon_img} ${styles.icon_filled}`);
        setTextIcon(TEXT_ICON_INFO)
        break;
      case TYPE_ICON_FILLED_HELP:
        setClassIcon(`${styles.icon_img} ${styles.icon_filled_help}`);
        setTextIcon(text);
        setClassSpan(`${styles.span} ${styles.span_help}`)
        break;
      default:
        return;
    }
  }, [])

  return(
    <div className={styles.icon}>
      <div className={classIcon}></div>
      <span className={classSpan}>{textIcon}</span>
    </div>
  )
};

export default IconInfo;
