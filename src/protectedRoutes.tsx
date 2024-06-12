import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRoutesProps {
  children: ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
  const token = localStorage.getItem('user');
  const location = useLocation();
  const path = location.pathname;

  if (!token) {
    return <Navigate to="/login" />;
  }
  
  if (token && path === "/") {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
}

export default ProtectedRoutes;
