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
import Button from "../button/button";

const Lead = () => {
  return (
    <section className={styles.lead}>
      <h1 className={styles.title}>{TEXT_LEAD_PAGE}</h1>
      <p className={styles.subtitle}>{TEXT_LEAD_ABOUT}</p>
      <section className={styles.container}>
        <img src={ImgLead} alt={TEXT_IMG_LEAD} />
        <div className={styles.content}>
          <div className={styles.cards}>
            {CARD_INFO_LEAD.map((card) => (
              <CardInfo key={card._id} card={card} />
            ))}
          </div>
          <Button type={TYPE_BTN_TRY} />
        </div>
      </section>
    </section>
  );
};

export default Lead;
