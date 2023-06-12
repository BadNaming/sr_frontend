import { NavLink, Link } from "react-router-dom";
import styles from "./header.module.css";
import globalStyles from '../global-styles.module.css'
import Logo from "../../images/logo.svg";
import {
  TEXT_LOGO,
  TEXT_SIGN_IN,
  TEXT_SIGN_UP,
  PATH_HOME,
  PATH_SIGN_IN,
  PATH_SIGN_UP,
} from "../../utils/constants";
import { useEffect, useState } from "react";

const Header = () => {
  const [classHeader, setClassHeader] = useState(`${styles.header}`)

  useEffect(()=>{
    setClassHeader(`${styles.header} ${styles.header_show}`)
  }, [])

  return (
    <header className={classHeader}>
      <Link to={PATH_HOME} className={globalStyles.link}>
        <img src={Logo} alt={TEXT_LOGO} />
      </Link>
      <ul className={styles.links}>
        <NavLink to={PATH_SIGN_IN} className={`${styles.link_header} ${globalStyles.link}`}>
          {TEXT_SIGN_IN}
        </NavLink>
        <NavLink
          to={PATH_SIGN_UP}
          className={`${globalStyles.link} ${styles.link_selected}`}
        >
          {TEXT_SIGN_UP}
        </NavLink>
      </ul>
    </header>
  );
};

export default Header;
