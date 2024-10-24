import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  
import EmployeeInfo from './EmployeeInfo';
import RequestList from './RequestList';

const ManagerPage = () => {
  const [view, setView] = useState('');
  const [managerName, setManagerName] = useState('');
  const [managerId, setManagerId] = useState('');
  const navigate = useNavigate();  

  useEffect(() => {
    const fetchManagerInfo = () => {
      const fetchedManagerName = 'John Doe'; 
      const fetchedManagerId = 'M12345'; 

      setManagerName(fetchedManagerName);
      setManagerId(fetchedManagerId);
    };

    fetchManagerInfo();
  }, []); 

  const handleAttendanceClick = () => {
    setView('attendance');
  };

  const handlePayrollClick = () => {
    setView('payroll');
  };

  const handleVacationRequestClick = () => {
    setView('vacation');
  };

  const handleAttendanceChangeRequestClick = () => {
    setView('attendanceChange');
  };

  const handleLogout = () => {
    navigate('/');  
  };

  return (
    <div className="manager-page">
      <header className="header">
        <div className="company-name">アルバイトタイムス</div>
        <div className='right-side'>
          <div className='logo-space'>
            <img src="/logo.png" alt="Company Logo" className="logo" />
          </div>
          <div className="system-name">給与管理システム</div>
        </div>
      </header>

      <div className="user-info">
        <img src="/default_user_icon.png" alt="User Icon" className="user-icon" />
        <span>{managerName} (ID: {managerId})</span>
      </div>

      <div className="navbar">
        <button onClick={handleAttendanceClick}>出勤情報</button>
        <button onClick={handlePayrollClick}>給与情報</button>
        <button onClick={handleAttendanceChangeRequestClick}>出席変更申請</button>
        <button onClick={handleVacationRequestClick}>休暇承認申請</button>
        <button onClick={handleLogout} className="logout-button">ログアウト</button>
      </div>

      <div className="content">
        {view === 'attendance' && <EmployeeInfo type="attendance" />}
        {view === 'payroll' && <EmployeeInfo type="payroll" />}
        {view === 'vacation' && <RequestList type="vacation" />}
        {view === 'attendanceChange' && <RequestList type="attendanceChange" />}
      </div>
    </div>
  );
};

export default ManagerPage;
