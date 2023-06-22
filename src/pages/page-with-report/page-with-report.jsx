import styles from './page-with-report.module.css';
import { TEXT_PAGE_REPORT_SHAPER, PATH_REPORT_SHAPER } from '../../utils/constants';
import Footer from '../../components/footer/footer';
import { useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';

const PageWithReport = ({children}) => {
  const location = useLocation();
  const [textTitle, setTextTitle] = useState("");

  useEffect(() => {
    switch (location.pathname) {
      case PATH_REPORT_SHAPER:
        setTextTitle(TEXT_PAGE_REPORT_SHAPER);
        break;
      default:
        return;
    }
  }, [location.pathname]);

  return (
    <>
      <section className={styles.overlay}>
        <div className={styles.container}>
          <h2 className={styles.title}>{textTitle}</h2>
          {children}
        </div>
        <Footer/>
      </section>
    </>
  )
};

export default PageWithReport;
