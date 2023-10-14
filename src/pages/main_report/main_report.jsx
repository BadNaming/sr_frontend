import styles from './main_report.module.css'
import React, { useEffect, useState } from 'react'
import {
  REPORT_IN_PROGRESS,
  REPORT_READY,
  REPORT_ERROR,
  TYPE_INPUT_CLIENT_ID,
  TYPE_INPUT_CLIENT_SECRET,
  TYPE_BTN_REPORT_GO,
  TYPE_BTN_REPORT_MAKE,
  TYPE_INPUT_CLIENT_VK_TOKEN
} from '../../utils/constants'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import Footer from '../../components/footer/footer'
import SortingModal from '../../components/sorting_modal/sorting_modal'
import CheckMarks from './checkmarks'
import ButtonElement from '../../components/button-element/button-element'
import { useSelector } from 'react-redux'
import { getUser } from '../../store/auth/selectors'
import { useAddDailyDataMutation } from '../../store/auth/services/reports'

const MainReport = () => {
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
  const listItemsCampaigns = [
    'Вебинар',
    'Промо акция',
    'Наружная реклама',
    'E-mail рассылки'
  ]

  const user = useSelector(getUser)
  const [fetchDaliyData, { isLoading: isLoadingData, isError: isErrorData, isSuccess: isSuccessData, data: dailyData }] = useAddDailyDataMutation()
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


  /* const [reports, setReports] = useState([
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
    },
    {
      id: 5,
      name: 'Общий отчёт',
      status: REPORT_IN_PROGRESS,
      date: '18.11.2022'
    },
    {
      id: 6,
      name: 'Эффективность проектов',
      status: REPORT_READY,
      date: '10.11.2022'
    },
    {
      id: 7,
      name: 'Динамика расходов',
      status: REPORT_READY,
      date: '10.11.2022'
    },
    {
      id: 8,
      name: 'Влияние трафика на продажи',
      status: REPORT_ERROR,
      date: '29.10.2022'
    },
    {
      id: 9,
      name: 'Динамика расходов',
      status: REPORT_READY,
      date: '10.11.2022'
    },
    {
      id: 10,
      name: 'Влияние трафика на продажи',
      status: REPORT_ERROR,
      date: '29.10.2022'
    }
  ]) */

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
        <div className={styles.sorting_icon_container}>
          <div
            className={styles.icon_vert_dots_container}
            onClick={(e) => {
              e.preventDefault()
              setIsSortingVisible({
                report_name: false,
                report_status: false,
                report_date: false,
                [column]: !isSortingVisible[column]
              })
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z"
                className={styles.icon_vert_dots}
              />
            </svg>
          </div>{' '}
        </div>
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
      report_name: false,
      report_status: false,
      report_date: false,
      [column]: false
    })
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className={styles.background}>
        <div className={styles.container}>
          <h2 className={styles.heading}>Основной отчет</h2>
          <div className={styles.target_platform}>
            <div className={styles.target_platform_item}>
              ВКонтакте ID: 13159
            </div>
            <div className={styles.target_platform_item}>
              MyTarget ID: 58136
            </div>
          </div>
          <div className={styles.report_filtering}>
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
                <span className={styles.groupping_item_name}>Тип группировки:{' '}</span>
                <span className={styles.groupping_item_value}>за всё время</span>
              </div>
              <div className={styles.groupping_item}>
                <span className={styles.groupping_item_name}>Разбивка:{' '}</span>
                <span className={styles.groupping_item_value}>по объявлениям</span>
              </div>
            </div>
          </div>
          <div className={styles.modals}>
            <SortingModal
              isVisible={isSortingVisible['report_name']}
              onChange={handleSortingChange('report_name')}
              leftPosition={0}
              width={'391px'}
            />
            <SortingModal
              isVisible={isSortingVisible['report_status']}
              onChange={handleSortingChange('report_status')}
              leftPosition={'392px'}
              width={'308px'}
            />
            <SortingModal
              isVisible={isSortingVisible['report_date']}
              onChange={handleSortingChange('report_date')}
              leftPosition={'701px'}
              width={'308px'}
            />
          </div>
          <div className={styles.table_container}>
            {/* <table className={styles.table}>
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
            </table> */}
          </div>
          <div className={styles.group_button}>
            <ButtonElement type={TYPE_BTN_REPORT_GO} />
            <ButtonElement type={TYPE_BTN_REPORT_MAKE} />
          </div>
        </div>
        <Footer />
      </div>
    </LocalizationProvider>
  )
}

export default MainReport
