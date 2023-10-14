import Header from "../header/header";
import Lead from "../lead/lead";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import RestorePassword from "../../pages/restore-password/restore-password";
import ReportSettings from "../../pages/report-settings/report-settings";
import PageWithForm from "../../pages/page-with-form/page-with-form";
import PageWithReport from "../../pages/page-with-report/page-with-report";
import Cabinet from "../../pages/cabinet/cabinet";
import { Routes, Route } from "react-router-dom";
import {
  PATH_CABINET,
  PATH_HOME,
  PATH_SIGN_IN,
  PATH_SIGN_UP,
  PATH_RESTORE,
  PATH_REPORT_SETTINGS,
  PATH_REPORT_MAIN,
  PATH_MAIN_REPORT,
  APP_NAME,
  TYPE_INPUT_CLIENT_VK_TOKEN
} from "../../utils/constants";
import ProtectedRoute from "../../pages/protected-route/protected-route";
import { useLocation } from "react-router-dom";
import ReportMain from "../../pages/report-main/report-main";
import { useEffect } from "react";
import { useGetUserDataQuery } from "../../store/auth/services/auth";
import { useAddDailyDataMutation } from "../../store/auth/services/reports";
import { useDispatch } from 'react-redux'
import { addAdvPlatform, addUser } from '../../store/auth/authSlice'


const App = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  const dispatch = useDispatch()
  const { data: userData, refetch: refetchUserData } = useGetUserDataQuery()
  const [fetchDaliyData, { data: dailyData }] = useAddDailyDataMutation()

  useEffect(() => {
    if (localStorage.getItem(`${APP_NAME}Token`)) {
      refetchUserData()
    }
  }, [refetchUserData])

  useEffect(() => {
    if (userData) {
      dispatch(addUser({ ...userData }))
    }
  }, [dispatch, userData])

  useEffect(() => {
    if (userData) {
      if (TYPE_INPUT_CLIENT_VK_TOKEN in userData) {
        fetchDaliyData()
      }
    }
  }, [userData])

  useEffect(() => {
    if (dailyData) {
      dailyData.map((campaign) => {
        dispatch(addAdvPlatform({
          ad_plan_name: campaign.ad_plan_name,
          ad_plan_id: campaign.ad_plan_id,
        }))
      })
    }
  }, [dailyData, dispatch])

  return (
    <>
      <Header />
      <Routes location={background || location}>
        {/* страницы для всех */}
        <Route path={PATH_HOME} element={<Lead />} />
        {/* страницы для неавторизованных пользователей   */}
        <Route path={PATH_SIGN_IN} element={<ProtectedRoute onUnlyAuth={true} element={<PageWithForm><Login /></PageWithForm>} />} />
        <Route path={PATH_SIGN_UP} element={<ProtectedRoute onUnlyAuth={true} element={<PageWithForm><Register /></PageWithForm>} />} />
        <Route path={PATH_RESTORE} element={<ProtectedRoute onUnlyAuth={true} element={<PageWithForm><RestorePassword /></PageWithForm>} />} />

        {/* страницы для авторизованных пользователей */}
        <Route path={PATH_REPORT_SETTINGS} element={<ProtectedRoute element={<PageWithReport><ReportSettings /></PageWithReport>} />} />
        <Route path={PATH_REPORT_MAIN} element={<ProtectedRoute element={<PageWithReport><ReportMain /></PageWithReport>} />} />
        <Route path={PATH_CABINET} element={<ProtectedRoute element={<PageWithReport><Cabinet /></PageWithReport>} />} />
        {/* <Route path={PATH_MAIN_REPORT} element={<ProtectedRoute element={<MainReport/>} />}/> */}
      </Routes>
    </>
  );
}

export default App;
