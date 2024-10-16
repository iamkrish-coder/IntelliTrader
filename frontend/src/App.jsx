import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'sonner';
import PageNotFound from './pages/PageNotFound';
import ApplicationRoutes from './router/ApplicationRoutes.jsx';
import IMAGES from './constants/Images.js';
import ICONS from './constants/Icons.js';
import './assets/scss/style.scss';

const constants = {
    IMAGES : IMAGES,
    ICONS: ICONS
}

function App() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<ApplicationRoutes assets={constants}/>} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
            <Toaster position="top-center" className='p-0.5' richColors />
        </React.Fragment>
    );
}

export default App;
