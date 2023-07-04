import { NavLink, Link, useLocation } from 'react-router-dom';
import styles from './header.module.css';
import globalStyles from '../global-styles.module.css';
import Logo from '../../images/logo.svg';
import {
  TEXT_LOGO,
  TEXT_SIGN_IN,
  TEXT_SIGN_UP,
  TEXT_LINK_WATCH_REPORT,
  PATH_HOME,
  PATH_SIGN_IN,
  PATH_SIGN_UP
} from '../../utils/constants';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../../store/auth/selectors';
import IconChart from '../../images/icon_chart.svg';
import HeaderMenu from '../header-menu/header-menu';

const Header = () => {
  const [classHeader, setClassHeader] = useState(`${styles.header}`);
  const [classListLink, setListLink] = useState(`${styles.links}`);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const user = useSelector(getUser);
  const location = useLocation();

  useEffect(() => {
    user
      ? setListLink(`${styles.links} ${styles.links_user}`)
      : setListLink(`${styles.links}`)
  }, [user])

  useEffect(() => {
    setClassHeader(`${styles.header} ${styles.header_show}`)
  }, []);

  useEffect(()=>{
    setIsShowMenu(false)
  }, [location.pathname])

  const heandleUserName = () => {
    const arr = user.split(' ')
    return arr[1]
  }

  const handleShowMenu = () => {
    setIsShowMenu(!isShowMenu)
  }

  return (
    <header className={classHeader}>
      <Link to={PATH_HOME} className={globalStyles.link}>
        <img src={Logo} alt={TEXT_LOGO} />
      </Link>
      <ul className={classListLink}>
        {user ? (
          <>
            <NavLink
              to={PATH_HOME}
              className={`${globalStyles.link} ${styles.container_avatar}`}

            >
              <p className={`${styles.subtitle} ${styles.disabled}`}>
                {TEXT_LINK_WATCH_REPORT}
              </p>
              <img src={IconChart} alt="Изображение диаграммы"></img>
            </NavLink>
            <div
              className={styles.container_avatar}
              onMouseEnter={handleShowMenu}
              onMouseLeave={handleShowMenu}
            >
              <p className={styles.subtitle}>{heandleUserName()}</p>
              <span className={styles.img_avatar}>
                {heandleUserName().slice(0, 1)}
              </span>
              <HeaderMenu isShowMenu={isShowMenu}/>
            </div>
          </>
        ) : (
          <>
            <NavLink
              to={PATH_SIGN_IN}
              className={`${globalStyles.link} ${styles.link_header}`}
            >
              {TEXT_SIGN_IN}
            </NavLink>
            <NavLink
              to={PATH_SIGN_UP}
              className={`${globalStyles.link} ${styles.link_selected}`}
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
