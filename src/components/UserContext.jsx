import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
  
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        setUser(decodedToken);
      } catch (error) {
        console.error('Error decoding token:', error);
        // Handle the error accordingly (e.g., clear localStorage, redirect to login)
        localStorage.removeItem('token');
        // navigate('/');
      }
    }
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token);
  };
  

  const logoutUser = () => {
    // window.location.href = '/';
    setUser(null);
    localStorage.removeItem('token');
    // localStorage.clear();
    // console.log("asdasdas");
    
    // console.log(user);
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
