import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import axios from 'axios';
import './App.css';

import Main from './pages/Main';
import Register from './pages/Register';
import List from './pages/List';
import Memberregister from "./pages/Memberregister";


function App() {

  useEffect(() => {
    async function reToken () {
      if (refreshToken) {
        try { 
          await axios.post("/refresh", { refreshToken })
          .then((response) => {
            const { accessToken } = response.data;
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          })
          .catch((error) => {
            console.log('토큰 재발급 오류');
            console.log(error);
          })
        }
        catch (error) {
          console.log(error)
        }
      }
    }
  },[])

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/register" element={<Register />} />
          <Route path="/list" element={<List />} />
          <Route path="/memberregister" element={<Memberregister />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
