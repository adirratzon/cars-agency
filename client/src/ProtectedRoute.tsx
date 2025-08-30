import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = localStorage.getItem('user');
  if (!user) return <Navigate to="/login" />;

  const parsedUser = JSON.parse(user);
  if (parsedUser.role !== 'admin') return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
