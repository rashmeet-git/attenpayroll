import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import EmployeePage from './components/EmployeePage';
import ManagerPage from './components/ManagerPage';
import HRAdminPage from './components/HRAdminPage';
import './styles/App.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} /> 
                <Route path="/employee/:id" element={<EmployeePage />} /> 
                <Route path="/manager" element={<ManagerPage />} />
                <Route path="/hradmin" element={<HRAdminPage />} />
                <Route path="*" element={<h1>404 - Not Found</h1>} /> 
            </Routes>
        </Router>
    );
};

export default App;
