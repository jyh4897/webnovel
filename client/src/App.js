import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import './App.css';

import Main from './pages/Main';
import Register from './pages/Register';
import List from './pages/List';
import Memberregister from "./pages/Memberregister";
import Login from "./pages/Login";


export const tokenContext = createContext();


function App() {

  const [ refreshToken, setRefreshToken ] = useState(null);
  
  useEffect(() => {
    console.log(refreshToken)
  },[refreshToken])

  useEffect(() => {
    console.log(refreshToken);
    async function reToken () {
      if (refreshToken) {
        try { 
          await axios.post("http://localhost:8000/refresh", { refreshToken }, { withCredentials: true })
          .then((response) => {
            const { accessToken } = response.data;
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            console.log(refreshToken);
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
      else {
        return
      }
    }
    reToken();
  },[refreshToken])

  return (
        <tokenContext.Provider value={ { refreshToken, setRefreshToken } }>
        <Router>
          
            <div className="App">
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/register" element={<Register />} />
                <Route path="/list" element={<List />} />
                <Route path="/memberregister" element={<Memberregister />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </div>
          
        </Router>
        </tokenContext.Provider>
  );
}

export default App;
