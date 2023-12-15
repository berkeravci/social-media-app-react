import React from 'react';
import NavBar from '../components/Main/NavBar';  
import '../Main.css'    
import LeftBar from '../components/Main/LeftBar';
import MiddleContent from '../components/Main/MiddleContent/MiddleContent';
import { useUser } from '../components/UserContext';
import axios from 'axios';
import { useEffect } from 'react';
import Navigate from 'react';
import { useNavigate } from 'react-router-dom';
import RightBar from '../components/Main/RightBar';

const Main = () => {
    // useEffect(() => {
    //     // Check for the token in local storage
    //     const token = localStorage.getItem('token');
    
    //     if (token) {
    //       // Fetch user information using the token
    //       axios.get('http://localhost:3001/api/user', {
    //         headers: {
    //           Authorization: token,
    //         },
    //       })
    //         .then((response) => {
    //           const userData = response.data;
    //           // Set user data in your state
    //           // setUser(userData);
    //         })
    //         .catch((error) => console.error('Error fetching user:', error));
    //     }
    //   }, []);
    const { user } = useUser();
    const navigate = useNavigate();
    // useEffect(() => {
    //     // If the user is not logged in, redirect to the login page
    //     if (!user) {
          
    //       navigate('/');
    //       console.log("userssss")
    //     }
    //   }, [user, navigate]);
    
    console.log(user);
  return (
    <div>
       
      <NavBar />
      <div className='mainContainer'>
        <LeftBar></LeftBar>
        <MiddleContent></MiddleContent>
        <RightBar></RightBar>
      </div>
      
      
      
      
      
      
    </div>
  );
};

export default Main;