import IconInfo from "../icon-info/icon-info";
import ButtonElement from "../button-element/button-element";
import styles from "./card-advertising.module.css";
import {
  TYPE_ICON_FILLED,
  TYPE_BTN_ADD,
  TYPE_BTN_EDIT,
} from "../../utils/constants";
import { useCallback, useState } from "react";

const CardAdvertising = ({ card }) => {
  const [isConnect, setIsConnect] = useState(true); //временная
  const [textId, setTextId] = useState(""); //временная
  const [typeBtn, setTypeBtn] = useState(TYPE_BTN_ADD);
  const [classCard, setClassCard] = useState(`${styles.card}`);

  /** подключиться к рекламной платформе */
  const connectAdvertisingPlatform = useCallback(() => {
    setIsConnect(false);
    setTextId(`ID: ${card.company_id}`);
    setClassCard(`${styles.card} ${styles.card_theme_blue}`);
    setTypeBtn(TYPE_BTN_EDIT);
  }, []);

  const handleMouseEnter = () => {
    isConnect
      ? setClassCard(`${styles.card} ${styles.card_hover}`)
      : setClassCard(
          `${styles.card} ${styles.card_theme_blue} ${styles.card_hover}`
        );
  };

  const handleMouseLeave = () => {
    isConnect
      ? setClassCard(`${styles.card}`)
      : setClassCard(`${styles.card} ${styles.card_theme_blue}`);
  };

  return (
    <>
      <article className={classCard}>
        <div className={styles.caption}>
          <h3 className={styles.title}>{card.company}</h3>
          {isConnect && <IconInfo type={TYPE_ICON_FILLED} />}
        </div>
        <p className={styles.subtitle}>{textId}</p>
        <ButtonElement
          type={typeBtn}
          onClick={connectAdvertisingPlatform}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </article>
    </>
  );
};

export default CardAdvertising;
