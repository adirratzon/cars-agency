import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/admin/login');
    }
  }, [navigate]);

  return (
    <div className="admin-dashboard">
      <h2>לוח בקרה לאדמין</h2>
      <button onClick={() => navigate('/admin/add')}>➕ הוסף רכב</button>
      <button onClick={() => navigate('/admin/update')}>🛠 עדכן רכב</button>
      <button onClick={() => navigate('/admin/delete')}>❌ מחק רכב</button>
    </div>
  );
};

export default AdminDashboard;
