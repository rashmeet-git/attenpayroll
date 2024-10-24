import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/HRAdminPage.css';

const HRAdminPage = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('employee');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [employeeInfo, setEmployeeInfo] = useState({
    id: '',
    name: '',
    department: '',
    role: '',
    salary: '',
  });

  const handleLogout = () => {
    navigate('/');
  };

  const handleApiResponse = (response, successMessage) => {
    if (response.data) {
      alert(successMessage);
    } else {
      alert('No data found.');
    }
  };

  const handleApiError = (error, errorMessage) => {
    console.error('API Error:', error);
    alert(errorMessage);
  };

  const createEmployee = async () => {
    try {
      const response = await axios.post('/api/employees', employeeInfo);
      handleApiResponse(response, 'Employee created successfully!');
    } catch (error) {
      handleApiError(error, 'Failed to create employee.');
    }
  };

  const retrieveEmployee = async () => {
    try {
      const response = await axios.get(`/api/employees/${employeeInfo.id}`);
      if (response.data) {
        setEmployeeInfo(response.data);
        alert('Employee data retrieved successfully!');
      } else {
        alert('Employee not found.');
      }
    } catch (error) {
      handleApiError(error, 'Failed to retrieve employee.');
    }
  };

  const updateEmployee = async () => {
    try {
      const response = await axios.put(`/api/employees/${employeeInfo.id}`, employeeInfo);
      handleApiResponse(response, 'Employee updated successfully!');
    } catch (error) {
      handleApiError(error, 'Failed to update employee.');
    }
  };

  const deleteEmployee = async () => {
    try {
      await axios.delete(`/api/employees/${employeeInfo.id}`);
      alert('Employee deleted successfully!');
      setEmployeeInfo({ id: '', name: '', department: '', role: '', salary: '' });
    } catch (error) {
      handleApiError(error, 'Failed to delete employee.');
    }
  };

  const fetchAttendanceSummary = async () => {
    if (!month || !year) {
      alert('Please provide both month and year.');
      return;
    }

    try {
      const response = await axios.get(`/api/attendance-summary/${employeeInfo.id}/${month}/${year}`);
      const { presents, absents } = response.data;
      alert(`Presents: ${presents}, Absents: ${absents}`);
    } catch (error) {
      handleApiError(error, 'Failed to retrieve attendance summary.');
    }
  };

  return (
    <div className="hradmin-page">
      <header className="header">
        <div className="company-name">アルバイトタイムス</div>
        <div className='right-side'>
          <div className='logo-space'>
            <img src="/logo.png" alt="Company Logo" className="logo" />
          </div>
          <div className="system-name">給与管理システム</div>
        </div>
      </header>

      <div className="navbar">
        <button onClick={() => setView('employee')}>従業員管理</button>
        <button onClick={handleLogout} className="logout-button">ログアウト</button>
      </div>

      {view === 'employee' && (
        <div className="employee-management">
          <h2>従業員情報</h2>
          <div className="employee-info">
            <label>ID:</label>
            <input
              type="text"
              value={employeeInfo.id}
              onChange={(e) => setEmployeeInfo({ ...employeeInfo, id: e.target.value })}
            />
            <label>名前:</label>
            <input
              type="text"
              value={employeeInfo.name}
              onChange={(e) => setEmployeeInfo({ ...employeeInfo, name: e.target.value })}
            />
            <label>部門:</label>
            <input
              type="text"
              value={employeeInfo.department}
              onChange={(e) => setEmployeeInfo({ ...employeeInfo, department: e.target.value })}
            />
            <label>役割:</label>
            <input
              type="text"
              value={employeeInfo.role}
              onChange={(e) => setEmployeeInfo({ ...employeeInfo, role: e.target.value })}
            />
            <label>給与:</label>
            <input
              type="text"
              value={employeeInfo.salary}
              onChange={(e) => setEmployeeInfo({ ...employeeInfo, salary: e.target.value })}
            />
          </div>
          <button onClick={createEmployee}>従業員作成</button>
          <button onClick={retrieveEmployee}>従業員取得</button>
          <button onClick={updateEmployee}>従業員更新</button>
          <button onClick={deleteEmployee}>従業員削除</button>

          <h2>出席の概要</h2>
          <div className="attendance-summary">
            <label>月:</label>
            <input
              type="number"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              placeholder="例: 10"
            />
            <label>年:</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="例: 2024"
            />
            <button onClick={fetchAttendanceSummary}>出席概要取得</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRAdminPage;
