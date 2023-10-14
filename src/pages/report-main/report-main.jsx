import styles from './report-main.module.css'
import ButtonElement from '../../components/button-element/button-element'
import {
  TYPE_BTN_REPORT_SETTINGS,
  TYPE_BTN_REPORT_DOWNLOAD,
  PATH_REPORT_SETTINGS,
  TYPE_INPUT_CLIENT_ID,
  TYPE_INPUT_CLIENT_SECRET,
  TYPE_INPUT_CLIENT_VK_TOKEN,
  TYPE_FILTER_OFFICES,
  TYPE_FILTER_CAMPAIGN,
  TYPE_FILTER_DATA_REPORT
} from '../../utils/constants'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getAdvPlatform, getUser } from '../../store/auth/selectors'
import { useEffect, useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import TableReportMain from '../../components/table-report-main/table-report-main';
import { useAddDailyDataMutation, useGetStatisticsQuery } from '../../store/auth/services/reports'
import SelectElement from '../../components/select-element/select-element'


const ReportMain = () => {
  const advPlatforms = useSelector(getAdvPlatform)

  const navigate = useNavigate()
  const [textPlatform, setTexPlatform] = useState('')
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null
  })
  const [credentials, setCredentials] = useState({
    [TYPE_INPUT_CLIENT_ID]: '',
    [TYPE_INPUT_CLIENT_SECRET]: ''
  })

  const [campaigns, setCampaigns] = useState([])
  const [inputCampaigns, setInputCampaigns] = useState([])
  const [checkedCampaigns, setCheckedCampaigns] = useState([])

  const user = useSelector(getUser)
  const [fetchDaliyData, { isLoading: isLoadingData, isError: isErrorData, isSuccess: isSuccessData, data: dailyData }] = useAddDailyDataMutation()
  const { data: statisticsData, isLoading: isLoadingStatistics, isError: isErrorStatistics, isSuccess: isSuccessStatistics } = useGetStatisticsQuery()
  useEffect(() => {
    if (user[TYPE_INPUT_CLIENT_ID] && user[TYPE_INPUT_CLIENT_SECRET]) {
      setCredentials({
        [TYPE_INPUT_CLIENT_ID]: user[TYPE_INPUT_CLIENT_ID],
        [TYPE_INPUT_CLIENT_SECRET]: user[TYPE_INPUT_CLIENT_SECRET],
        [TYPE_INPUT_CLIENT_VK_TOKEN]: user[TYPE_INPUT_CLIENT_VK_TOKEN],
      })
      fetchDaliyData()
    }
  }, [fetchDaliyData, user])

  useEffect(() => {
    if (advPlatforms.length > 0) {
      setCampaigns(advPlatforms.map((item) => item.ad_plan_name))
      setInputCampaigns(advPlatforms.map((item) => item.ad_plan_name))
    }
  }, [advPlatforms]
  )

  useEffect(() => console.log(checkedCampaigns), [checkedCampaigns])

  useEffect(() => {
    advPlatforms &&
      setTexPlatform(`${advPlatforms.company}: ${advPlatforms.company_id}`)
  }, [])


  const handleClickReportSettings = () => {
    navigate(PATH_REPORT_SETTINGS)
  }

  const processData = (data) => {
    const result = []
    data.map(item => {
      const date = new Date(item.date)
      if (date >= dates.startDate && date <= dates.endDate && checkedCampaigns.includes(item.ad_plan_id)) {
        if (result.find((resultItem) => resultItem.ad_plan_id === item.ad_plan_id)) {
          result.find((resultItem) => resultItem.ad_plan_id === item.ad_plan_id).shows += item.shows
          result.find((resultItem) => resultItem.ad_plan_id === item.ad_plan_id).clicks += item.clicks
          result.find((resultItem) => resultItem.ad_plan_id === item.ad_plan_id).spent += parseFloat(item.spent)
        } else {
          result.push({
            ad_plan_id: item.ad_plan_id,
            ad_plan_name: item.ad_plan_name,
            shows: item.shows,
            clicks: item.clicks,
            spent: parseFloat(item.spent)
          })
        }
      }
    })
    return result
  }

  /*  const filteredStatisticsData = statisticsData && statisticsData.filter((item) => {
     const date = new Date(item.date)
     return date >= dates.startDate && date <= dates.endDate
   }).filter((item) => checkedCampaigns.includes(item.ad_plan_id)) */

  if (campaigns.length === 0) {
    return null
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <article className={styles.target_platform}>
          {/* TODO: что должно быть в этом поле? */}
          <p className={styles.target_platform_item}>{textPlatform}</p>
        </article>
        <section className={styles.report_filtering}>
          <div className={styles.left_side}>
            <SelectElement type={TYPE_FILTER_OFFICES} />
            <SelectElement data={inputCampaigns} handleSelect={setCheckedCampaigns} type={TYPE_FILTER_CAMPAIGN} />
            <SelectElement handleSelect={setDates} type={TYPE_FILTER_DATA_REPORT} />
          </div>
        </section>
        <section className={styles.table}>
          {statisticsData && <TableReportMain data={processData(statisticsData)} />}
        </section>
        <div className={styles.group_button}>
          <ButtonElement
            /* TODO: какой конкретно отчет должен настраиваться при нажатии на эту кнопку? */
            type={TYPE_BTN_REPORT_SETTINGS}
            onClick={handleClickReportSettings}
          />
          {/* TODO: что должно скачиваться при нажатии на эту кнопку? */}
          <ButtonElement type={TYPE_BTN_REPORT_DOWNLOAD} />
        </div>
      </LocalizationProvider>
    </>
  )
}

export default ReportMain
