
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PageNotFound from "../pages/PageNotFound.jsx";

function ApplicationRoutes({ assets }) {
    return (
        <Routes>
            <Route path="/" element={<Home assets={assets}/>} />
            <Route path="/login" element={<Login assets={assets}/>} />
            <Route path="/register" element={<Register assets={assets}/>} />
            <Route path="*" element={<PageNotFound assets={assets}/>} />
            {/* Other router */}
        </Routes>
    );
}

export default ApplicationRoutes;