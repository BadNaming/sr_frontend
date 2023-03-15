import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import menuImage from '../../images/report.png';
import avatarImage from '../../images/avatar.png';

const Header = () => {
  return (
    <header className="header">
      <div className="header__content">
        <Link to="#" className="logo page__link">
          <img src={logo} alt="Логотип Simple Reports" className="logo__image" />
          <p className="logo__title">
            Simple Reports
          </p>
        </Link>
        <nav className="menu">
          <ul className="menu__items page__list">
            <li className="menu__item">
              <a href="#" className="menu__link page__link">
                <p className="menu__text">
                  Посмотреть отчёт
                </p>
                <img src={menuImage} alt="" className="menu__image" />
              </a>
            </li>
            <li className="menu__item">
              <a href="#" className="menu__link page__link">
                <p className="menu__text">
                  Константин
                </p>
                <img src={avatarImage} alt="" className="menu__image" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
};

export default Header;