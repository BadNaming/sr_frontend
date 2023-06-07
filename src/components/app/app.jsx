import Header from "../header/header";
import Lead from "../lead/lead";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import RestorePassword from "../../pages/restore_password/restore-password";
import PageOverlay from "../../pages/page-overlay/page-overlay";
import { Routes, Route } from "react-router-dom";
import { PATH_HOME, PATH_SIGN_IN, PATH_SIGN_UP, PATH_RESTORE } from "../../utils/constants";

const App = () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path={PATH_HOME} element={<Lead />} />
        <Route path={PATH_SIGN_IN} element={<PageOverlay><Login/></PageOverlay>} />
        <Route path={PATH_SIGN_UP} element={<PageOverlay><Register/></PageOverlay>} />
        <Route path={PATH_RESTORE} element={<PageOverlay><RestorePassword/></PageOverlay>} />
      </Routes>
    </>
  );
}

export default App;

