import styles from './report-main.module.css'
import ButtonElement from '../../components/button-element/button-element'
import {
  TYPE_BTN_REPORT_SETTINGS,
  TYPE_BTN_REPORT_DOWNLOAD,
  PATH_REPORT_SETTINGS
} from '../../utils/constants'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getAdvPlatform } from '../../store/auth/selectors'
import { useEffect, useState } from 'react'
import CheckMarks from './checkmarks'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import TableReportMain from '../../components/table-report-main/table-report-main';

const ReportMain = () => {
  const navigate = useNavigate()
  const AdvPlatform = useSelector(getAdvPlatform)
  const [textPlatform, setTexPlatform] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endData, setEndDate] = useState(new Date())

  useEffect(() => {
    AdvPlatform &&
      setTexPlatform(`${AdvPlatform.company}: ${AdvPlatform.company_id}`)
  }, [])

  const handleClickReportSettings = () => {
    navigate(PATH_REPORT_SETTINGS)
  }

  const listItemsCampaigns = [
    'Вебинар',
    'Промо акция',
    'Наружная реклама',
    'E-mail рассылки'
  ]

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <article className={styles.target_platform}>
          <p className={styles.target_platform_item}>{textPlatform}</p>
        </article>
        <section className={styles.report_filtering}>
          <div className={styles.left_side}>
            <CheckMarks
              name={'Кабинеты'}
              listItems={listItemsCampaigns}
              marginLeft={113}
            ></CheckMarks>
            <CheckMarks
              name={'Кампании'}
              listItems={listItemsCampaigns}
              marginLeft={113}
            ></CheckMarks>
            <div className={styles.report_history_date}>
              <div className={styles.date_pickers}>
                <DesktopDatePicker
                  className={styles.calendar}
                  value={startDate}
                  onChange={(date) => setStartDate(date)}
                  slotProps={{ textField: { size: 'small' } }}
                />
                <div className={styles.space}>-</div>
                <DesktopDatePicker
                  value={endData}
                  onChange={(date) => setEndDate(date)}
                  slotProps={{ textField: { size: 'small' } }}
                />
              </div>
            </div>
          </div>
          <div className={styles.right_side}>
            <div className={styles.groupping_item}>
              <span className={styles.groupping_item_name}>
                Тип группировки:{' '}
              </span>
              <span className={styles.groupping_item_value}>за всё время</span>
            </div>
            <div className={styles.groupping_item}>
              <span className={styles.groupping_item_name}>Разбивка: </span>
              <span className={styles.groupping_item_value}>
                по объявлениям
              </span>
            </div>
          </div>
        </section>
        <section className={styles.table}>
          <TableReportMain/>
        </section>
        <div className={styles.group_button}>
          <ButtonElement
            type={TYPE_BTN_REPORT_SETTINGS}
            onClick={handleClickReportSettings}
          />
          <ButtonElement type={TYPE_BTN_REPORT_DOWNLOAD} />
        </div>
      </LocalizationProvider>
    </>
  )
}

export default ReportMain
