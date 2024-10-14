import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import PageNotFound from './pages/PageNotFound';
import ApplicationRoutes from './router/ApplicationRoutes.jsx';
import IMAGES from './constants/Images.js';
import ICONS from './constants/Icons.js';
import './assets/scss/custom-style.scss';

const constants = {
    IMAGES : IMAGES,
    ICONS: ICONS
}

function App() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home assets={constants}/>} />
                    <Route path="/*" element={<ApplicationRoutes />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;
