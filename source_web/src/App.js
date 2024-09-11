import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/*<Route path="/login" element={<LoginPage />} />*/}
        {/*<Route path="/signup" element={<SignupPage />} />*/}
        {/*<Route path="/dashboard" element={<DashboardPage />} />*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
