import { NavLink, Link, useLocation } from 'react-router-dom';
import styles from './header.module.css';
import Logo from '../../images/logo.svg';
import {
  TEXT_LOGO,
  TEXT_SIGN_IN,
  TEXT_SIGN_UP,
  PATH_SIGN_IN,
  PATH_SIGN_UP,
  PATH_REPORT_MAIN
} from '../../utils/constants';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../../store/auth/selectors';
import HeaderMenu from '../header-menu/header-menu';

const Header = () => {
  const [classListLink, setListLink] = useState(`${styles.links}`);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const user = useSelector(getUser);
  const location = useLocation();

  const heandleUserName = () => {
    return user.first_name
  }

  const handleShowMenu = () => {
    setIsShowMenu(true)
  }

  const handleHiddenMenu = () => {
    setIsShowMenu(false)
  }

  useEffect(() => {
    user
      ? setListLink(`${styles.links} ${styles.links_user}`)
      : setListLink(`${styles.links}`)
  }, [user])

  useEffect(() => {
    setIsShowMenu(false)
  }, [location.pathname])

  return (
    <header className={styles.header}>
      <Link to={PATH_REPORT_MAIN} className={styles.link}>
        <img src={Logo} alt={TEXT_LOGO} />
      </Link>
      <ul className={classListLink}>
        {user ? (
          <div
            className={styles.container_avatar}
            onMouseEnter={handleShowMenu}
            onMouseLeave={handleHiddenMenu}
          >
            <p className={styles.subtitle}>{heandleUserName()}</p>
            <span className={styles.img_avatar}>
              {heandleUserName()}
            </span>
            <HeaderMenu isShowMenu={isShowMenu} setIsShowMenu={setIsShowMenu} />
          </div>
        ) : (
          <>
            <NavLink
              to={PATH_SIGN_IN}
              className={`${styles.link} ${styles.link_header}`}
            >
              {TEXT_SIGN_IN}
            </NavLink>
            <NavLink
              to={PATH_SIGN_UP}
              className={`${styles.link} ${styles.link_selected}`}
            >
              {TEXT_SIGN_UP}
            </NavLink>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header
