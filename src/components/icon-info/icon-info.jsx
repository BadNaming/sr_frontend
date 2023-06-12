import { useEffect, useState } from 'react';
import styles from './icon-info.module.css';
import { TYPE_ICON_FILLED, TEXT_ICON_INFO } from '../../utils/constants';

const IconInfo = ({type}) => {
  const [classIcon, setClassIcon] = useState(`${styles.icon_img}`);

useEffect(()=>{
    switch (type) {
      case TYPE_ICON_FILLED:
        setClassIcon(`${styles.icon_img} ${styles.icon_filled}`);
        break;
      default:
        return;
    }
  }, [])

  return(
    <div className={styles.icon}>
      <div className={classIcon}></div>
      <span className={styles.span}>{TEXT_ICON_INFO}</span>
    </div>
  )
};

export default IconInfo;
