import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../UserContext';

const LoginGuardedRoute = ({ element }) => {
  const { user } = useUser();
    
  // If the user is logged in, render a redirect to /main
//   if (localStorage.getItem('token')) {
//     return <Navigate to="/main" replace />;
//   }
<Navigate to="/main" replace />;
  // If the user is not logged in, render the provided element (Login Component)
  return element;
};

export default LoginGuardedRoute;