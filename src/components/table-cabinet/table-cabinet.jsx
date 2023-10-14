import styles from './table-cabinet.module.css'
import axios from 'axios'
import {
  BASE_URL,
  REPORT_IN_PROGRESS,
  REPORT_READY,
  TABLE_CABINET_COLUMN,
} from '../../utils/constants'
import SortingMenu from '../sorting-menu/sorting-menu'
import SortingModal from '../sorting_modal/sorting_modal'
import { useEffect, useState } from 'react'

const TableCabinet = ({ reports, isSuccess }) => {
  useEffect(() => {
    if (reports) {
      reports.map((report) => console.log(new Date(report.date).toLocaleDateString()))

    }

  }, [reports])

  const [hoveredColumn, setHoveredColumn] = useState(null)
  const [isSortingVisible, setIsSortingVisible] = useState(null)

  const handleMouseEnter = (item) => {
    setHoveredColumn(item)
  }

  const handleMouseLeave = () => {
    setHoveredColumn(null)
  }

  const handleShowSortingModal = (item) => {
    if (isSortingVisible) {
      setIsSortingVisible(null)
    } else {
      setIsSortingVisible(item)
    }
  }

  const handleSortingChange = (column) => (value) => {
    handleShowSortingModal(column)
    if (value === 'ASC') {
      return reports.sort((a, b) => {
        if (a[column] < b[column]) {
          return -1
        } else {
          return 1
        }
      })
    } else if (value === 'DESC') {
      return reports.sort((a, b) => {
        if (a[column] < b[column]) {
          return 1
        } else {
          return -1
        }
      })
    } else {
      reports.sort((a, b) => {
        return parseFloat(a.id) - parseFloat(b.id)
      })
    }
  }

  const downloadFile = async (reportId) => {
    try {
      const response = await axios.get(`${BASE_URL}v1/report/download/${reportId}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report-${reportId}.xls`);
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Ошибка при скачивании файла:', error);
    }
  };


  return (
    <>
      <table className={styles.table}>
        <thead className={styles.table_head}>
          <tr className={styles.container_column}>
            {TABLE_CABINET_COLUMN &&
              TABLE_CABINET_COLUMN.map((item) => (
                <th
                  key={item.id}
                  className={styles.table_column}
                  onMouseEnter={() => {
                    handleMouseEnter(item.textEn)
                  }}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.textRU}
                  <SortingMenu
                    column={item.textEn}
                    hoveredColumn={hoveredColumn}
                    onClick={() => handleShowSortingModal(item.textEn)}
                  />
                  <SortingModal
                    column={item.textEn}
                    isSortingVisible={isSortingVisible}
                    onChange={handleSortingChange(item.textEn)}
                  />
                </th>
              ))}
          </tr>
        </thead>
        <tbody className={styles.table_body}>
          {isSuccess && reports &&
            reports.map((item, index) => (
              <tr key={item.id} className={styles.container_column}>
                <td className={styles.table_column}>
                  {++index}
                  {'. '}
                  {item.title}
                </td>
                <td className={styles.table_column}>
                  <div className={styles.row_with_icon}>
                    <div className={styles.icon_container}>
                      <div
                        className={
                          item.status === REPORT_IN_PROGRESS
                            ? styles.update_icon
                            : item.status === REPORT_READY
                              ? styles.checked_icon
                              : styles.info_icon
                        }
                      ></div>
                    </div>
                    <div>{item.status === REPORT_IN_PROGRESS ? 'В процессе подготовки' : item.status === REPORT_READY ? 'Готов' : 'Ошибка'}</div>
                  </div>
                </td>
                <td className={styles.table_column}>{new Date(item.date).toLocaleDateString()}</td>
                <td className={styles.table_column}>
                  <div className={styles.row_with_icon}>
                    <div
                      className={styles.icon_container_download}
                      onClick={() => downloadFile(item.id)}
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
                    <div>{item.download}</div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

export default TableCabinet
