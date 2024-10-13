
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import PageNotFound from "../pages/PageNotFound.jsx";

function ApplicationRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
            {/* Other router */}
        </Routes>
    );
}

export default ApplicationRoutes;