import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthentication } from "../../store/auth/selectors";
import { PATH_SIGN_IN, PATH_HOME } from "../../utils/constants";

const ProtectedRoute = ({ element, onUnlyAuth = false, ...rest }) => {
  const isAuthenticated = useSelector(isAuthentication);
  const location = useLocation();
  const from = location.state?.from || PATH_HOME;

  /** Если разрешен неавторизованный доступ, а пользователь авторизован...*/
  if (onUnlyAuth && isAuthenticated) {
    return <Navigate to={from} />; //переход на предыдущую страницу
  }

  /** Если требуется авторизация, а пользователь не авторизован... */
  if (!onUnlyAuth && !isAuthenticated) {
    return <Navigate to={PATH_SIGN_IN} state={{ from: location }}/>;
  }

  /** onlyUnAuth-true  isGetUser-false*/
  /** onlyUnAuth-false  isGetUser-true */
  return element;
};

export default ProtectedRoute;

