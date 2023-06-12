import styles from './report-shaper.module.css';
import CardAdvertising from '../../components/card-advertising/card-advertising';
import { TEXT_PAGE_REPORT_SHAPER_SUBTITLE, CARD_ADVERTISING } from "../../utils/constants";

const ReportShaper = () => {
  return (
    <>
      <p className={styles.subtitle}>{TEXT_PAGE_REPORT_SHAPER_SUBTITLE}</p>
      <div className={styles.cards}>
        {CARD_ADVERTISING.map((card) => (
          <CardAdvertising key={card._id} card={card} />
        ))}
      </div>
    </>
  )
};

export default ReportShaper;
