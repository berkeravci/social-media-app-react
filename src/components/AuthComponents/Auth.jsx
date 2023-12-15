import React, { useState } from 'react';
import Login from './Login';
import Signup from './SignUp';
import '../Login.css'; // Import the shared style file

const AuthContainer = () => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="container">
      {isSignup ? (
        <Signup switchToLogin={() => setIsSignup(false)} />
      ) : (
        <Login switchToSignup={() => setIsSignup(true)} />
      )}
    </div>
  );
};

export default AuthContainer;