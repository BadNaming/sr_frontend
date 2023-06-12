import IconInfo from '../icon-info/icon-info';
import styles from './card-advertising.module.css';
import { TYPE_ICON_FILLED } from '../../utils/constants';
import { useState } from 'react';

const CardAdvertising = ({card}) => {
  const [isConnect, setIsConnect] = useState(true)//временная
  const [textId, setTextId] = useState('')//временная
  const [classBtnConnect, setBtnConnect] = useState(`${styles.btn_connect} ${styles.btn_add}`);
  const [classWrapper, setClassWrapper] = useState(`${styles.wrapper}`);

  /** подключиться к рекламной платформе */
  const connectAdvertisingPlatform = () => {
    setIsConnect(false)
    setBtnConnect(`${styles.btn_connect} ${styles.btn_pencil}`)
    setTextId(`ID: ${card.company_id}`)
    setClassWrapper(`${styles.wrapper} ${styles.wrapper_theme_blue}`)
  }


  return (
    <article className={styles.card}>
      <button className={classBtnConnect} onClick={connectAdvertisingPlatform}></button>
      <div className={classWrapper}>
        <div className={styles.caption}>
          <h3 className={styles.title}>{card.company}</h3>
          {isConnect && <IconInfo type={TYPE_ICON_FILLED}/>}
        </div>
        <p className={styles.subtitle}>{textId}</p>
      </div>
    </article>
  )
};

export default CardAdvertising;
