import styles from './header-menu.module.css'
import { useSelector } from 'react-redux'
import { getUser } from '../../store/auth/selectors'
import IconLogout from '../../images/icon_logout.svg'
import IconProfile from '../../images/icon_profile.svg'
import IconChart from '../../images/icon_chart_ligth.svg'
import { Link, useNavigate } from 'react-router-dom'
import {
  PATH_CABINET,
  PATH_HOME,
  PATH_MAIN_REPORT,
  TEXT_LINK_PROFILE,
  TEXT_LINK_REPORTS,
  TEXT_LINK_LOGOUT,
  PATH_REPORT_MAIN
} from '../../utils/constants'
import { useEffect, useState } from 'react'

const HeaderMenu = ({ isShowMenu }) => {
  const [classMenu, setClassMenu] = useState(`${styles.wrapper}`);
  const user = useSelector(getUser);
  const navigate = useNavigate();

  const onlogout = () => {
    navigate(PATH_HOME);
    window.location.reload();
  };

  useEffect(() => {
    isShowMenu
      ? setClassMenu(`${styles.wrapper} ${styles.wrapper_visible}`)
      : setClassMenu(`${styles.wrapper}`)
  }, [isShowMenu]);

  return (
    <article className={classMenu}>
      <div className={styles.background}>
        <div className={styles.container}>
          <p className={styles.subtitle}>{user.name}</p>
          <p className={`${styles.subtitle} ${styles.subtitle_secondary}`}>
            {user.email}
          </p>
        </div>
        <div className={styles.border}></div>
        <ul className={`${styles.container} ${styles.list_links}`}>
          <Link to={PATH_CABINET} className={styles.link_container}>
            <img src={IconProfile} alt="Изображение профиля"></img>
            <p className={styles.subtitle}>{TEXT_LINK_PROFILE}</p>
          </Link>
          <Link to={PATH_REPORT_MAIN} className={styles.link_container}>
            <img src={IconChart} alt="Изображение диаграммы"></img>
            <p className={styles.subtitle}>{TEXT_LINK_REPORTS}</p>
          </Link>
        </ul>
        <div className={styles.border}></div>
        <Link
          to={PATH_HOME}
          className={`${styles.link_container} ${styles.container}`}
          onClick={onlogout}
        >
          <img src={IconLogout} alt="Изображение выход"></img>
          <p className={styles.subtitle}>{TEXT_LINK_LOGOUT}</p>
        </Link>
</div>
    </article>
  )
}

export default HeaderMenu
