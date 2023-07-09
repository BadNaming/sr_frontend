import styles from './report-settings.module.css';
import CardAdvertising from '../../components/card-advertising/card-advertising';
import ButtonElement from '../../components/button-element/button-element';
import SelectElement from '../../components/select-element/select-element';
import {
  TEXT_PAGE_REPORT_SETTINGS_SUBTITLE,
  TEXT_SELECT_METRICS,
  TEXT_ADD_BREAKDOWN,
  CARD_ADVERTISING,
  TYPE_BTN_REPORT_GO,
  TYPE_BTN_REPORT_MAKE,
  TYPE_FILTER_OFFICES,
  TYPE_FILTER_CAMPAIGN,
  TYPE_FILTER_GROUPING,
  TYPE_FILTER_DATA_REPORT,
  TYPE_FILTER_METRICS,
  PATH_REPORT_MAIN
} from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const ReportSettings = () => {
  const navigate = useNavigate()

  const handleClickReportMake = () => {
    navigate(PATH_REPORT_MAIN)
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <p className={styles.subtitle}>{TEXT_PAGE_REPORT_SETTINGS_SUBTITLE}</p>
        <div className={styles.cards}>
          {CARD_ADVERTISING.map((card) => (
            <CardAdvertising key={card._id} card={card} />
          ))}
        </div>
        <div className={styles.group_fillter}>
          <SelectElement type={TYPE_FILTER_OFFICES} />
          <SelectElement type={TYPE_FILTER_CAMPAIGN} />
          <SelectElement type={TYPE_FILTER_DATA_REPORT} />
          <SelectElement type={TYPE_FILTER_GROUPING} />
        </div>
        <div className={styles.group_subtitle}>
          <p className={styles.subtitle}>{TEXT_SELECT_METRICS}</p>
          <div className={styles.group_with_checkbox}>
            <label className={styles.label}>
              <input type="checkbox" className={styles.input} />
              <span className={styles.visible_checkbox}></span>
            </label>
            <p className={`${styles.subtitle} ${styles.subtitle_type_smal}`}>
              {TEXT_ADD_BREAKDOWN}
            </p>
          </div>
        </div>
        <div className={styles.group_metrics}>
          <SelectElement type={TYPE_FILTER_METRICS} />
        </div>
        <div className={styles.group_button}>
          <ButtonElement type={TYPE_BTN_REPORT_GO} />
          <ButtonElement
            type={TYPE_BTN_REPORT_MAKE}
            onClick={handleClickReportMake}
          />
        </div>
      </LocalizationProvider>
    </>
  )
}

export default ReportSettings
