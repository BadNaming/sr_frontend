import styles from './page-with-report.module.css'
import {
  TEXT_PAGE_REPORT_SETTINGS,
  TEXT_PAGE_REPORT_MAIN,
  TEXT_PAGE_CABINET,
  PATH_REPORT_SETTINGS,
  PATH_REPORT_MAIN,
  PATH_CABINET
} from '../../utils/constants'
import Footer from '../../components/footer/footer'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

const PageWithReport = ({ children }) => {
  const location = useLocation()
  const [textTitle, setTextTitle] = useState('')

  useEffect(() => {
    switch (location.pathname) {
      case PATH_REPORT_SETTINGS:
        setTextTitle(TEXT_PAGE_REPORT_SETTINGS)
        break
      case PATH_REPORT_MAIN:
        setTextTitle(TEXT_PAGE_REPORT_MAIN)
        break
      case PATH_CABINET:
        setTextTitle(TEXT_PAGE_CABINET)
        break
      default:
        return
    }
  }, [location.pathname])

  return (
    <>
      <section className={styles.overlay}>
        <div className={styles.container}>
          <h2 className={styles.title}>{textTitle}</h2>
          {children}
        </div>
        <Footer />
      </section>
    </>
  )
}

export default PageWithReport
