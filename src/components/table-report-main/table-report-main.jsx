import styles from './table-report-main.module.css'
import {
  TABLE_REPORT_MAIN_COLUMN,
  TABLE_REPORT_MAIN_ROWS,
  TYPE_ICON_FILLED_HELP
} from '../../utils/constants'
import IconInfo from '../icon-info/icon-info'

const TableReportMain = () => {
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
          {TABLE_REPORT_MAIN_ROWS &&
            TABLE_REPORT_MAIN_ROWS.map((item, index) => (
              <tr key={item.id} className={styles.container_column}>
                <td className={styles.table_column}>{item.name}</td>
                <td className={styles.table_column}>{item.showing}</td>
                <td className={styles.table_column}>{item.cpm}</td>
                <td className={styles.table_column}>{item.clicks}</td>
                <td className={styles.table_column}>
                  {item.ctr}
                  {'%'}
                </td>
                <td className={styles.table_column}>{item.cpc}</td>
                <td className={styles.table_column}>
                  {item.cr}
                  {'%'}
                </td>
                <td className={styles.table_column}>{item.cpf}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

export default TableReportMain
