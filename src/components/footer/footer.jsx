import styles from "./footer.module.css";
import { TEXT_FOOTER } from "../../utils/constants";

const Footer = () => {
  /* установить текущий год для footer */
  const getYear = () => {
    return new Date().getFullYear();
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.copyright_container}>
        <span className={styles.copyright}>&copy;{" " + getYear()}</span>
        <span className={styles.brand}>{TEXT_FOOTER}</span>
      </div>
    </footer>
  );
};

export default Footer;
