import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import Main from '../../pages/Main';

const ProtectedRoute = ({ element }) => {
    const { user } = useUser();
    console.log(user);
    console.log(localStorage.getItem('token'));
    
    // If the user is not logged in, redirect to the login page
    if (!localStorage.getItem('token')) {
      console.log("no user");
      return <Navigate to="/" />;
    } else {
      console.log("user");

      // If the user is logged in, render the provided element (MainComponent)
      return element;
    }

    // if (user) {
    //     return <Navigate to="/main" replace />;
    //   }
  };
  
  export default ProtectedRoute;