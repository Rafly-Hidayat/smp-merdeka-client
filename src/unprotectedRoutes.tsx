import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface UnprotectedRoutesProps {
  children: ReactNode;
}

const UnprotectedRoutes: React.FC<UnprotectedRoutesProps> = ({ children }) => {
  const token = localStorage.getItem('user');
  if (token) {
    return <Navigate to="/dashboard" />;
  }
  return <>{children}</>;
}

export default UnprotectedRoutes;
