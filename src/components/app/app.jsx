import Header from "../header/header";
import Lead from "../lead/lead";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import RestorePassword from "../../pages/restore_password/restore-password";
import ReportCustom from "../../pages/report-shaper/report-shaper";
import PageWithForm from "../../pages/page-with-form/page-with-form";
import PageWithReport from "../../pages/page-with-report/page-with-report";
import Cabinet from "../../pages/cabinet/cabinet";
import { Routes, Route } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {
  PATH_CABINET,
  PATH_HOME,
  PATH_SIGN_IN,
  PATH_SIGN_UP,
  PATH_RESTORE,
  PATH_REPORT_SHAPER
} from "../../utils/constants";

const App = () => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Header/>
        <Routes>
          <Route path={PATH_HOME} element={<Lead />} />
          <Route path={PATH_SIGN_IN} element={<PageWithForm><Login/></PageWithForm>} />
          <Route path={PATH_SIGN_UP} element={<PageWithForm><Register/></PageWithForm>} />
          <Route path={PATH_RESTORE} element={<PageWithForm><RestorePassword/></PageWithForm>} />
          <Route path={PATH_REPORT_SHAPER} element={<PageWithReport><ReportCustom/></PageWithReport>} />
          <Route path={PATH_CABINET} element={<Cabinet/>} />
        </Routes>
      </LocalizationProvider>
    </>
  );
}

export default App;
