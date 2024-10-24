import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeePage = () => {
  const [employeeInfo, setEmployeeInfo] = useState({
    id: '',
    name: '',
    department: '',
    role: '',
    final_salary: '',
    profileImage: '/default_user_icon.png',
  });
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    const id = localStorage.getItem('employeeId'); 
    if (id) {
      setEmployeeInfo((prev) => ({ ...prev, id })); 
    }
  }, []);

  useEffect(() => {
    console.log("start useEffect");
    const fetchEmployeeInfo = async () => {
      if (!employeeInfo.id) return; 

      try {
        console.log("getting employee info");
        const response = await axios.get(`http://localhost:3000/api/employee/${employeeInfo.id}`);
        setEmployeeInfo(response.data); 
      } catch (error) {
        console.error('Error fetching employee info:', error);
      }
    };

    fetchEmployeeInfo();
  }, [employeeInfo.id]); 

  const fetchAttendanceRecords = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/attendance/${employeeInfo.id}?month=${month}&year=${year}`);
      setAttendanceRecords(response.data);
    } catch (error) {
      console.error("Error fetching attendance records:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('employeeId'); 
    window.location.href = '/';
  };

  return (
    <div className="employee-page">
      <header className="header">
        <div className="company-name">アルバイトタイムス</div>
        <div className='right-side'>
          <div className='logo-space'>
            <img src="/logo.png" alt="Logo" className="logo" />
          </div>
          <div className="system-name">給与管理システム</div>
        </div>
      </header>

      <div className="navbar">
        <button onClick={handleLogout} className="logout-button">ログアウト</button>
      </div>

      <div className="employee-info">
        <h2>従業員情報</h2>
        <div className="profile-section">
          <img src={employeeInfo.profileImage} alt="Profile" className="profile-image" />
        </div>
        <label>ID:</label>
        <input type="text" value={employeeInfo.id} readOnly />
        <label>名前:</label>
        <input type="text" value={employeeInfo.name} readOnly />
        <label>部門:</label>
        <input type="text" value={employeeInfo.department} readOnly />
        <label>役割:</label>
        <input type="text" value={employeeInfo.role} readOnly />
        <label>給与:</label>
        <input type="text" value={employeeInfo.final_salary} readOnly />
      </div>

      <div className="attendance-section">
        <h2>出席記録</h2>
        <div className="attendance-input">
          <label>月:</label>
          <input
            type="number"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            min="1"
            max="12"
          />
          <label>年:</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <button onClick={fetchAttendanceRecords}>出席記録取得</button>
        </div>

        {loading ? (
          <p>読み込み中...</p>
        ) : (
          <div className="attendance-records">
            <h3>出席記録一覧</h3>
            {attendanceRecords.length > 0 ? (
              <ul>
                {attendanceRecords.map((record) => (
                  <li key={record.id}>
                    日付: {record.date} - 状態: {record.status}
                  </li>
                ))}
              </ul>
            ) : (
              <p>出席記録がありません。</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeePage;
