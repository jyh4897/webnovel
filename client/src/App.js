import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import Main from './pages/Main';
import Register from './pages/Register';
import List from './pages/List';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/register" element={<Register />} />
          <Route path="/list" element={<List />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
