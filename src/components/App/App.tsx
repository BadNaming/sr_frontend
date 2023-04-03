import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ReportSettings from '../ReportSettings/ReportSettings';
import Main from '../Main/Main';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { RootState } from '../../store';
import { useEffect } from 'react';
import { fetchAllData } from '../../store/reducers/actionCreators';

function App() {

  const state = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllData());
  }, []);

  console.log(state);
  return (
    <div className="page">
      <Header />
      <Main>
        <Routes>
          <Route path='/report-settings' element={<ReportSettings />} />
          <Route path='/report' element={'otchet'} />
        </Routes>
      </Main>
      <Footer />
    </div>
  );
}

export default App;
