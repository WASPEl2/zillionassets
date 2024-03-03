import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    // Redirect non-admin users to home page or show an access denied message
    return <Navigate to="/" />;
    // Or you can render a message instead of redirecting
    // return <div>Access Denied. You are not authorized to access this page.</div>;
  }

  return children;
};

export default ProtectedRoute;
