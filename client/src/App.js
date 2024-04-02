import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import Main from './pages/Main';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
