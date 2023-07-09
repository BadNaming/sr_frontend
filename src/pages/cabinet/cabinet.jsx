import { useSelector } from 'react-redux'
import { useState } from 'react'
import styles from './cabinet.module.css'
import { getUser } from '../../store/auth/selectors'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import { TEXT_REPORT_HISTORY } from '../../utils/constants'
import TableCabinet from '../../components/table-cabinet/table-cabinet'

const Cabinet = () => {
  const user = useSelector(getUser)
  const [startDate, setStartDate] = useState(new Date())
  const [endData, setEndDate] = useState(new Date())

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
