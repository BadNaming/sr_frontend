import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ReportSettings from '../ReportSettings/ReportSettings';
import Main from '../Main/Main';

function App() {
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
