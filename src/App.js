import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';

import SearchPage from './pages/SearchPage';
import ShowPage from './pages/ShowPage';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<SearchPage />} />
          <Route path='/show' element={<ShowPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
