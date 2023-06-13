import styles from "./lead.module.css";
import {
  TEXT_LEAD_PAGE,
  TEXT_LEAD_ABOUT,
  TEXT_IMG_LEAD,
  TYPE_BTN_TRY,
  CARD_INFO_LEAD,
} from "../../utils/constants";
import ImgLead from "../../images/lead_page.svg";
import CardInfo from "../card-info/card-info";
import ButtonElement from '../button-element/button-element'
import { useEffect, useState } from "react";

const Lead = () => {
  const [classTitle, setClassTitle] = useState(`${styles.title}`);
  const [classSubtitle, setClassSubtitle] = useState(`${styles.subtitle}`);
  const [classImg, setClassImg] = useState(`${styles.img}`);
  const [classCards, setClassCards] = useState(`${styles.cards}`)

  useEffect(()=>{
    setClassTitle(`${styles.title} ${styles.title_show}`);
    setClassSubtitle(`${styles.subtitle} ${styles.subtitle_show}`);
    setClassImg(`${styles.img} ${styles.img_show}`);
    setClassCards(`${styles.cards} ${styles.cards_show}`)
  }, [])

  return (
    <section className={styles.lead}>
      <h1 className={classTitle}>{TEXT_LEAD_PAGE}</h1>
      <p className={classSubtitle}>{TEXT_LEAD_ABOUT}</p>
      <section className={styles.container}>
        <img src={ImgLead} alt={TEXT_IMG_LEAD} className={classImg}/>
        <div className={styles.content}>
          <div className={classCards}>
            {CARD_INFO_LEAD.map((card) => (
              <CardInfo key={card._id} card={card} />
            ))}
          </div>
          <ButtonElement type={TYPE_BTN_TRY} />
        </div>
      </section>
    </section>
  );
};

export default Lead;
