import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import MainPage from './pages/MainPage/index';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Router>
    </>
  );
}
