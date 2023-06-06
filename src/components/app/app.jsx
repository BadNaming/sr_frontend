import Header from "../header/header";
import Lead from "../lead/lead";
import Login from "../../pages/login/login";
import PageOverlay from "../../pages/page-overlay/page-overlay";
import { Routes, Route } from "react-router-dom";
import { PATH_HOME, PATH_SIGN_IN } from "../../utils/constants";

const App = () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path={PATH_HOME} element={<Lead />} />
        <Route path={PATH_SIGN_IN} element={<PageOverlay><Login/></PageOverlay>} />
      </Routes>
    </>
  );
}

export default App;

