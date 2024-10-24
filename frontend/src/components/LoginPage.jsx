import React, { useState } from 'react';
import '../styles/LoginPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [role, setRole] = useState('');
  const [id, setId] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const intId = parseInt(id, 10); 
      const response = await axios.post('http://localhost:3000/api/login', { 
        role: role, 
        id: intId, 
        password: password
      });

      console.log(response);

      if (response.status === 200) {
        
        if (role === 'employee') {
          localStorage.setItem('employeeId', response.data.id);
          navigate(`/employee/${intId}`); 
        } else if (role === 'manager') {
          navigate('/manager'); 
        } else if (role === 'hradmin') {
          navigate('/hradmin'); 
        }
      }
    } catch (error) {
      console.error('Error details:', error);
      if (error.response && error.response.data) {
        
        setErrorMessage(error.response.data.message || 'Invalid credentials, please try again.');
      } else {
        console.error(error.message);
        setErrorMessage('An error occurred, please try again later.'); 
      }
    }
  };

  return (
    <div className="login-page">
      <header className="header">
        <div className="company-name">アルバイトタイムス</div>
        <div className='right-side'>
          <div className='logo-space'>
            <img src="/logo.png" alt="Logo" className="logo" />
          </div>
          <div className="system-name">給与管理システム</div>
        </div>
      </header>

      <main className="main-section">
        <h1>ようこそ!</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="role">役割:</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="" disabled>
                選択してください
              </option>
              <option value="employee">従業員</option>
              <option value="manager">マネージャー</option>
              <option value="hradmin">人事管理者</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="id">ID:</label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="13245" 
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">パスワード:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="xxxxx" 
              required
            />
          </div>
          <button type="submit" className="login-button">
            ログイン
          </button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </main>
    </div>
  );
};

export default LoginPage;
