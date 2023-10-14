import styles from './table-report-main.module.css'
import {
  TABLE_REPORT_MAIN_COLUMN,
  TABLE_REPORT_MAIN_ROWS,
  TYPE_ICON_FILLED_HELP
} from '../../utils/constants'
import IconInfo from '../icon-info/icon-info'

const TableReportMain = (props) => {
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.table_head}>
          <tr className={styles.container_column}>
            {TABLE_REPORT_MAIN_COLUMN &&
              TABLE_REPORT_MAIN_COLUMN.map((item) => (
                <th key={item.id} className={`${styles.table_column} ${styles.table_column_head}`}>
                  <div className={styles.container_column_head}>
                    <p>{item.textRU}</p>
                    {item.text_info && (
                      <IconInfo
                        type={TYPE_ICON_FILLED_HELP}
                        text={item.text_info}
                      />
                    )}
                  </div>
                </th>
              ))}
          </tr>
        </thead>
        <tbody className={styles.table_body}>
          {props.data &&
            props.data.map((item, index) => (
              <tr key={item.ad_plan_name} className={styles.container_column}>
                <td className={styles.table_column}>{item.ad_plan_name}</td>
                <td className={styles.table_column}>{item.spent.toFixed(2)}</td>
                <td className={styles.table_column}>{item.shows}</td>
                <td className={styles.table_column}>{(item.spent / item.shows * 1000).toFixed(2)}</td>
                <td className={styles.table_column}>{item.clicks}</td>
                <td className={styles.table_column}>
                  {item.shows ? (item.clicks / item.shows * 100).toFixed(2) : 0}
                  {'%'}
                </td>
                <td className={styles.table_column}>{item.clicks ? (item.spent / item.clicks).toFixed(2) : 0}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

export default TableReportMain
