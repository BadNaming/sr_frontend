import styles from './report-settings.module.css'
import CardAdvertising from '../../components/card-advertising/card-advertising'
import ButtonElement from '../../components/button-element/button-element'
import SelectElement from '../../components/select-element/select-element'
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
} from '../../utils/constants'
import { useNavigate } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useCreateReportMutation } from '../../store/auth/services/reports'
import React, { useEffect, useState } from 'react'
import { convertDate } from '../../utils/helpers'
import { getAdvPlatform } from '../../store/auth/selectors'
import { useSelector } from 'react-redux'


const ReportSettings = () => {
  const [dates, setDates] = useState({
    startDate: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
    endDate: new Date()
  })
  const [metrics, setMetrics] = useState(['shows', 'spend'])
  /* TODO: выбрать все кампании по умолчанию */
  const [campaigns, setCampaigns] = useState([])
  const advPlatforms = useSelector(getAdvPlatform)
  const [createReport, { data: reportData, isSuccess: reportIsSuccess }] = useCreateReportMutation()

  useEffect(() => {
    if (reportIsSuccess && reportData) {
      console.log(reportData)
    }
  })

  useEffect(() => {
    if (advPlatforms.length > 0) {
      setCampaigns(advPlatforms.map((item) => item.ad_plan_name))
    }
  }, [advPlatforms]
  )


  const handleClickReportMake = () => {
    if (dates.startDate && dates.endDate) {
      createReport({
        start_date: convertDate(dates.startDate),
        end_date: convertDate(dates.endDate),
        ad_plans: campaigns,
        metrics
      })
    }
    /* navigate(PATH_REPORT_MAIN) */
  }

  /** Router - один и тот же PATH_REPORT_MAIN, условия разные
   * "Перейти к отчету" - это посмотреть отчет в текущем виде
   * "Сформировать отчет" - это принять изменения настроек и перейти к отчету */

  if (campaigns.length === 0) {
    return null
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
          <SelectElement data={campaigns} handleSelect={setCampaigns} type={TYPE_FILTER_CAMPAIGN} />
          <SelectElement handleSelect={setDates} type={TYPE_FILTER_DATA_REPORT} />
        </div>
        <div className={styles.group_subtitle}>
          <p className={styles.subtitle}>{TEXT_SELECT_METRICS}</p>
        </div>
        <div className={styles.group_metrics}>
          <SelectElement handleSelect={setMetrics} type={TYPE_FILTER_METRICS} />
        </div>
        <div className={styles.group_button}>
          <ButtonElement
            disabled={!reportIsSuccess}
            /* TODO: у нас должна быть страница конкретного отчета? У нас есть страница со всеми отчетами, где её можно скачать, а также страница со сводными данными */
            type={TYPE_BTN_REPORT_GO}
            onClick={handleClickReportMake}
          />
          <ButtonElement
            disabled={campaigns.length === 0}
            type={TYPE_BTN_REPORT_MAKE}
            onClick={handleClickReportMake}
          />
        </div>
      </LocalizationProvider >
    </>
  )
}

export default ReportSettings
