import { NavLink, Link } from "react-router-dom";
import styles from "./header.module.css";
import Logo from "../../images/logo.svg";
import {
  TEXT_LOGO,
  TEXT_SIGN_IN,
  TEXT_SIGN_UP,
  PATH_HOME,
  PATH_SIGN_IN,
  PATH_SIGN_UP,
} from "../../utils/constants";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to={PATH_HOME}>
        <img src={Logo} alt={TEXT_LOGO} />
      </Link>
      <ul className={styles.links}>
        <li className={styles.link}>
          <NavLink to={PATH_SIGN_IN} />
          {TEXT_SIGN_IN}
        </li>
        <li className={styles.link_active}>
          <NavLink to={PATH_SIGN_UP}/>
          {TEXT_SIGN_UP}
        </li>
      </ul>
    </header>
  );
};

export default Header;
