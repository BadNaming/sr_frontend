import styles from './page-with-report.module.css';
import { TEXT_PAGE_REPORT_SHAPER, TEXT_FOOTER } from '../../utils/constants';

const PageWithReport = ({children}) => {

  /* установить текущий год для footer */
  const getYear=()=>{
    return new Date().getFullYear();
  }

  return (
    <>
      <section className={styles.overlay}>
        <div className={styles.container}>
          <h2 className={styles.title}>{TEXT_PAGE_REPORT_SHAPER}</h2>
          {children}
        </div>
        <footer className={styles.footer}>
          <p className={styles.year}>&copy;{' ' + getYear()}</p>
          <p className={styles.trade_name}>{TEXT_FOOTER}</p>
        </footer>
      </section>
    </>
  )
};

export default PageWithReport;
