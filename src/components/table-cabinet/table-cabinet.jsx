import styles from './table-cabinet.module.css'
import {
  REPORT_IN_PROGRESS,
  REPORT_READY,
  TABLE_CABINET_COLUMN,
  TABLE_CABINET_ROWS
} from '../../utils/constants'
import SortingMenu from '../sorting-menu/sorting-menu'
import SortingModal from '../sorting_modal/sorting_modal'
import { useState } from 'react'

const TableCabinet = () => {
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
      return TABLE_CABINET_ROWS.sort((a, b) => {
        if (a[column] < b[column]) {
          return -1
        } else {
          return 1
        }
      })
    } else if (value === 'DESC') {
      return TABLE_CABINET_ROWS.sort((a, b) => {
        if (a[column] < b[column]) {
          return 1
        } else {
          return -1
        }
      })
    } else {
      TABLE_CABINET_ROWS.sort((a, b) => {
        return parseFloat(a.id) - parseFloat(b.id)
      })
    }
  }

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
          {TABLE_CABINET_ROWS &&
            TABLE_CABINET_ROWS.map((item, index) => (
              <tr key={item.id} className={styles.container_column}>
                <td className={styles.table_column}>
                  {++index}
                  {'. '}
                  {item.name}
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
                    <div>{item.status}</div>
                  </div>
                </td>
                <td className={styles.table_column}>{item.date}</td>
                <td className={styles.table_column}>
                  <div className={styles.row_with_icon}>
                    <div
                      className={styles.icon_container_download}
                      onClick={() => {
                        alert(item.id)
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
