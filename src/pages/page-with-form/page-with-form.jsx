import styles from "./page-with-form.module.css";
import {
  TEXT_PAGE_SIGN_IN,
  TEXT_PAGE_REGISTER,
  TEXT_PAGE_RESTORE,
  TEXT_LINK_REGISTER,
  TEXT_LINK_RESTORE,
  TEXT_DATA_PROCESSING,
  TEXT_DATA_PROCESSING_LINK,
  TEXT_PAGE_RESTORE_SUBTITLE,
  PATH_SIGN_IN,
  PATH_SIGN_UP,
  PATH_RESTORE,
} from "../../utils/constants";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const PageWithForm = ({ children }) => {
  const location = useLocation();
  const [textTitle, setTextTitle] = useState("");

  useEffect(() => {
    switch (location.pathname) {
      case PATH_SIGN_IN:
        setTextTitle(TEXT_PAGE_SIGN_IN);
        break;
      case PATH_SIGN_UP:
        setTextTitle(TEXT_PAGE_REGISTER);
        break;
      case PATH_RESTORE:
        setTextTitle(TEXT_PAGE_RESTORE);
        break;
      default:
        return;
    }
  }, [location.pathname]);

  return (
    <section className={styles.overlay}>
      <article className={styles.container}>
        <h2 className={styles.title}>{textTitle}</h2>
        {children}
        {location.pathname === PATH_SIGN_IN && (
          <ul className={styles.links}>
            <NavLink to={PATH_SIGN_UP} className={styles.link}>
              {TEXT_LINK_REGISTER}
            </NavLink>
            <NavLink to={PATH_RESTORE} className={styles.link}>
              {TEXT_LINK_RESTORE}
            </NavLink>
          </ul>
        )}
        {location.pathname === PATH_SIGN_UP && (
          <div className={styles.content}>
            <label className={styles.label}>
              {/* TODO: связать это с состоянием формы */}
              <input type="checkbox" className={styles.input} />
              <span className={styles.visible_checkbox}></span>
            </label>
            <p className={styles.subtitle}>
              {TEXT_DATA_PROCESSING}
              <Link to={"/"} className={`${styles.link} ${styles.link_active}`}>
                {TEXT_DATA_PROCESSING_LINK}
              </Link>
            </p>
          </div>
        )}
        {location.pathname === PATH_RESTORE && (
          <div className={styles.content}>
            <p className={styles.subtitle}>{TEXT_PAGE_RESTORE_SUBTITLE}</p>
          </div>
        )}
      </article>
    </section>
  );
};

export default PageWithForm;
