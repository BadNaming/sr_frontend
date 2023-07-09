import { useSelector } from 'react-redux'
import { useState } from 'react'
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
import { addAdvCabinet } from '../../store/auth'
import ButtonElement from '../../components/button-element/button-element'

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

  const onChange = (e) => {
    e.preventDefault()
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    dispatch(addAdvCabinet(credentials))
    setTextButtonSubmit(TYPE_BTN_EDIT)
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
