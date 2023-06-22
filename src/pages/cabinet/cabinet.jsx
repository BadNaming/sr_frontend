import styles from './cabinet.module.css'
import React, { useState } from 'react'
import {
  REPORT_IN_PROGRESS,
  REPORT_READY,
  REPORT_ERROR,
  TYPE_INPUT_CLIENT_ID,
  TYPE_INPUT_CLIENT_SECRET
} from '../../utils/constants'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import SimpleInputElement from '../../components/simple-input-element/simple-input-element'
import SelectInput from './select'
import { set } from 'date-fns';
import Footer from '../../components/footer/footer';

const Cabinet = () => {
  const [hoveredColumn, setHoveredColumn] = useState(null)
  const [isSortingVisible, setIsSortingVisible] = useState({
    report_name: false,
    report_status: false,
    report_date: false
  })
  const [sorting, setSorting] = useState({
    report_name: null,
    report_status: null,
    report_date: null
  })

  const [credentials, setCredentials] = useState({
    [TYPE_INPUT_CLIENT_ID]: '',
    [TYPE_INPUT_CLIENT_SECRET]: ''
  })
  const [firstname, setFirstname] = useState('Константин')
  const [lastname, setLastname] = useState('Константинов')
  const [phone, setPhone] = useState('8 (919) 558-37-45')
  const [email, setEmail] = useState('study.business@yandex.ru')
  const [startDate, setStartDate] = useState(new Date())
  const [endData, setEndDate] = useState(new Date())
  const [reports, setReports] = useState([
    {
      id: 1,
      name: 'Общий отчёт',
      status: REPORT_IN_PROGRESS,
      date: '18.11.2022'
    },
    {
      id: 2,
      name: 'Эффективность проектов',
      status: REPORT_READY,
      date: '10.11.2022'
    },
    {
      id: 3,
      name: 'Динамика расходов',
      status: REPORT_READY,
      date: '10.11.2022'
    },
    {
      id: 4,
      name: 'Влияние трафика на продажи',
      status: REPORT_ERROR,
      date: '29.10.2022'
    }
  ])

  const onChange = (e) => {
    e.preventDefault()
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
    console.log(credentials)
  }
  const handleMouseEnter = (column) => {
    setHoveredColumn(column)
  }

  const handleMouseLeave = () => {
    setHoveredColumn(null)
  }

  const renderSortingButton = (column) => {
    if (hoveredColumn === column) {
      return (
        <button
          onClick={(e) => {
            e.preventDefault()
            setIsSortingVisible({
              ...isSortingVisible,
              [column]: !isSortingVisible[column]
            })
          }}
        >
          Сортировка
        </button>
      )
    }
    return null
  }

  const handleSortingChange = (column) => (value) => {
    setSorting({
      ...sorting,
      [column]: value
    })
    setIsSortingVisible({
      ...isSortingVisible,
      [column]: false
    })
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className={styles.background}>
        <div className={styles.container}>
          <div className={styles.report_name_modal}>
            <SelectInput
              visible={isSortingVisible['report_name']}
              onChange={handleSortingChange('report_name')}
            />
          </div>
          <div className={styles.report_status_modal}>
            <SelectInput
              visible={isSortingVisible['report_status']}
              onChange={handleSortingChange('report_status')}
            />
          </div>
          <div className={styles.report_date_modal}>
            <SelectInput
              visible={isSortingVisible['report_date']}
              onChange={handleSortingChange('report_date')}
            />
          </div>
          <h2 className={styles.heading}>Личный кабинет</h2>
          <div className={styles.user_info}>
            <div className={styles.user_info_first_row}>
              <h3 className={styles.name}>
                {firstname} {lastname}
              </h3>
              <h4 className={styles.phone}>{phone}</h4>
            </div>
            <p className={styles.user_info_second_row}>{email}</p>
          </div>
          <form className={styles.client_credentials}>
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
          </form>
          <h3 className={styles.report_history}>
            История сформированных отчётов
          </h3>
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
            <table className={styles.table}>
              <thead className={styles.table_head}>
                <tr>
                  <th
                    className={styles.table_first_column}
                    onMouseEnter={() => handleMouseEnter('report_name')}
                    onMouseLeave={handleMouseLeave}
                  >
                    Отчет {renderSortingButton('report_name')}
                  </th>
                  <th
                    className={styles.table_second_column}
                    onMouseEnter={() => handleMouseEnter('report_status')}
                    onMouseLeave={handleMouseLeave}
                  >
                    Статус {renderSortingButton('report_status')}
                  </th>
                  <th
                    className={styles.table_third_column}
                    onMouseEnter={() => handleMouseEnter('report_date')}
                    onMouseLeave={handleMouseLeave}
                  >
                    Дата формирования {renderSortingButton('report_date')}
                  </th>
                  <th className={styles.table_fourth_column}>Скачать</th>
                </tr>
              </thead>
              <tbody className={styles.table_body}>
                {reports.map((report, index) => (
                  <tr key={report.id} className={styles.table_row}>
                    <td className={styles.table_first_column}>
                      {++index}
                      {'. '}
                      {report.name}
                    </td>
                    <td className={styles.table_second_column}>
                      <div className={styles.row_with_icon}>
                        <div className={styles.icon_container}>
                          <div
                            className={
                              report.status === REPORT_IN_PROGRESS
                                ? styles.update_icon
                                : report.status === REPORT_READY
                                ? styles.checked_icon
                                : styles.info_icon
                            }
                          ></div>
                        </div>
                        <div>{report.status}</div>
                      </div>
                    </td>
                    <td className={styles.table_third_column}>{report.date}</td>
                    <td className={styles.table_fourth_column}>
                      <div className={styles.row_with_icon}>
                        <div
                          className={styles.icon_container_download}
                          onClick={() => {
                            alert(report.id)
                          }}
                        >
                          <svg
                            width="16"
                            height="18"
                            viewBox="0 0 16 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 10H9V0H7V10H4L8 14L12 10ZM0 16V18H16V16H0Z"
                              className={styles.download_icon}
                            />
                          </svg>
                        </div>
                        <div>Скачать в XLS</div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Footer/>
      </div>
    </LocalizationProvider>
  )
}

export default Cabinet
