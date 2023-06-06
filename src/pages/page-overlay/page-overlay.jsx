import styles from "./page-overlay.module.css";
import {
  TEXT_PAGE_SIGN_IN,
  TEXT_LINK_REGISTER,
  TEXT_LINK_RESTORE,
  PATH_SIGN_IN,
  PATH_SIGN_UP,
  PATH_RESTORE,
} from "../../utils/constants";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const PageOverlay = ({ children }) => {
  const location = useLocation();
  const [textTitle, setTextTitle] = useState("");

  useEffect(() => {
    switch (location.pathname) {
      case PATH_SIGN_IN:
        setTextTitle(TEXT_PAGE_SIGN_IN);
        break;
      default:
        return;
    }
  }, []);

  return (
    <section className={styles.overlay}>
      <article className={styles.container}>
        <h2 className={styles.title}>{textTitle}</h2>
        {children}
        <ul className={styles.links}>
          <NavLink to={PATH_SIGN_UP} className={styles.link}>
            {TEXT_LINK_REGISTER}
          </NavLink>
          <NavLink to={PATH_RESTORE} className={styles.link}>
            {TEXT_LINK_RESTORE}
          </NavLink>
        </ul>
      </article>
    </section>
  );
};

export default PageOverlay;
