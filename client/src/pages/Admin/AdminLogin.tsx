import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === '1234') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    } else {
      alert('שם משתמש או סיסמה שגויים');
    }
  };

  return (
    <div className="admin-login">
      <h2>התחברות אדמין</h2>
      <input placeholder="שם משתמש" onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="סיסמה" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>התחבר</button>
    </div>
  );
};

export default AdminLogin;
