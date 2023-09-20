import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import styles from './cabinet.module.css'
import { getUser } from '../../store/auth/selectors'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import {
  TEXT_REPORT_HISTORY,
  TYPE_INPUT_CLIENT_ID,
  TYPE_INPUT_CLIENT_SECRET,
  TYPE_BTN_SAVE,
  TYPE_BTN_EDIT
} from '../../utils/constants'
import TableCabinet from '../../components/table-cabinet/table-cabinet'
import SimpleInputElement from '../../components/simple-input-element/simple-input-element'
import { useDispatch } from 'react-redux'
import ButtonElement from '../../components/button-element/button-element'
import { addAdvPlatform } from '../../store/auth/authSlice'
import { useUpdateUserMutation } from '../../store/auth/services/auth'
import { useAddDailyDataMutation } from '../../store/auth/services/reports'

const Cabinet = () => {
  const dispatch = useDispatch()
  const [textButtonSubmit, setTextButtonSubmit] = useState(TYPE_BTN_SAVE)
  const user = useSelector(getUser)
  const [startDate, setStartDate] = useState(new Date())
  const [endData, setEndDate] = useState(new Date())
  const [credentials, setCredentials] = useState({
    [TYPE_INPUT_CLIENT_ID]: '',
    [TYPE_INPUT_CLIENT_SECRET]: ''
  })
  const [updateUser, { isLoading: isLoadingUser, isError: isErrorUser, isSuccess: isSuccessUser, data: userData }] = useUpdateUserMutation()
  const [fetchDaliyData, { isLoading: isLoadingData, isError: isErrorData, isSuccess: isSuccessData, data: dailyData }] = useAddDailyDataMutation()

  const onChange = (e) => {
    e.preventDefault()
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
      vk_client_token: 'eKppLLD7bq3R58MvrO7knzmW9FAA50WErNre2RyPapDSnI5Ecbw1LHVfhb212ie9ZRKZnbngzo4SnOQ9JCMnIS8A5OfkjuXdiubkXjfW8JfdzFLbciGYJaKVIDjVk9D18FcTD7kUbFNzAgXYidtHlCK9uP8OI1Rutxs9k2tTL3JLlbigavm38IKxZ43w6dcJDyRm2d6WvoonPajnmVFwhd6GZiOl'
    })
  }

  useEffect(() => {
    if (userData)
      fetchDaliyData()
  }, [fetchDaliyData, userData])

  useEffect(() => {
    if (dailyData)
      dailyData.map((campaign) => {
        dispatch(addAdvPlatform({
          ad_plan_name: campaign.ad_plan_name,
          ad_plan_id: campaign.ad_plan_id,
        }))
      })
  }, [dailyData, dispatch])

  const handleFormSubmit = (e) => {
    e.preventDefault()
    updateUser(credentials).unwrap().then(async (res) => {
      console.log(res)
      if ('id' in res) {
        setTextButtonSubmit(TYPE_BTN_EDIT)
      }
    }).catch((err) => err)
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className={styles.user_info}>
          <div className={styles.user_info_first_row}>
            <p className={styles.name}>{user.name}</p>
            <p className={styles.phone}>{user.phone}</p>
          </div>
          <p className={styles.user_info_second_row}>{user.email}</p>
        </div>
        <form className={styles.client_credentials} onSubmit={handleFormSubmit}>
          <SimpleInputElement
            type={TYPE_INPUT_CLIENT_ID}
            value={credentials[TYPE_INPUT_CLIENT_ID]}
            onChange={(e) => {
              onChange(e)
            }}
          />
          <SimpleInputElement
            type={TYPE_INPUT_CLIENT_SECRET}
            value={credentials[TYPE_INPUT_CLIENT_SECRET]}
            onChange={(e) => {
              onChange(e)
            }}
          />
          <ButtonElement type={textButtonSubmit}></ButtonElement>
        </form>
        <h3 className={styles.report_history}>{TEXT_REPORT_HISTORY}</h3>
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
        <div className={styles.table_container}>
          <TableCabinet />
        </div>
      </LocalizationProvider>
    </>
  )
}

export default Cabinet
