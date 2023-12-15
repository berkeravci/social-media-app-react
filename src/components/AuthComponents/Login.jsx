// // Login.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Login.css';
//import { useHistory } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
//import frontImage from '../public/frontImg.jpg';
import loginstyle from '../../Login.css';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newemail, setNewEmail] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [newusername, setNewUsername] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();
  const { loginUser } = useUser();

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    return password.length >= 3;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    console.log(file.name);
  };

  // useEffect(() => {
  //   console.log(loginError);
  // }, [loginError]);

  //const history = useHistory();
  const history = createBrowserHistory();

  const handleLogin = async () => {
    try {
      console.log("sdsdsd"+newemail);
      const response = await axios.post('http://localhost:3001/api/login', {
        username,
        password: Number(password),
        profileImage,
        
        
      });
      console.log(response);
      const userData = { username: username,profileImage:response.data.profileImage,token: response.data.token}; // Replace with actual user data
      console.log(userData);
      loginUser(userData);
      
      // Handle successful login
      
      console.log(profileImage);
      console.log('Token:', response.data.token);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('image',response.data.profileImage);
      console.log(localStorage.getItem('image'));
      console.log(response);
      setLoginError('');

      //history.push('/main');
      navigate('/main');

    } catch (error) {
      // Handle login error
      console.error(error);
      setLoginError('Invalid Credentials');
      
    }
    
  };

  const handleSignup = async () => {

    if (!isEmailValid(newemail)) {
      setLoginError('Invalid email format');
      
      return; // Stop further processing
    }

    if(!isPasswordValid(newpassword)){
      setLoginError('It should contain at least 3 characters');
      
      
      
      return;
    }
    
    const formData = new FormData();
    formData.append('username', newusername);
    formData.append('email', newemail);
    formData.append('password', Number(newpassword));
    formData.append('profileImage', profileImage);


    try {
      // const response = await axios.post('http://localhost:3001/api/signup', {
      //   username: newusername, // Fix: Send 'username' instead of 'newusername'
      //   email: newemail,       // Fix: Send 'email' instead of 'newemail'
      //   password: Number(newpassword),
      //   profileImage: profileImage
      // });

      const response = await axios.post('http://localhost:3001/api/signup', formData);
  
      // Handle successful signup
      console.log(response.data);
      console.log(profileImage);
    } catch (error) {
      // Handle signup error
      console.error(error);
      setLoginError('Invalid Credentials');
    }
    
  };


  // const handleAuth = async () => {
  //   try {
  //     const endpoint = isLogin ? 'login' : 'signup';
  //     const response = await axios.post(`http://localhost:3001/api/${endpoint}`, {
  //       username,
  //       password: Number(password),
  //       email,
  //     });

  //     // Handle successful login or signup
  //     console.log(response.data);
  //     console.log('Token:', response.data.token);
  //   } catch (error) {
  //     // Handle login or signup error
  //     console.error(error);
  //     setLoginError("Invalid Credentials");
  //   }
  // };


  return (
    <div>
      <div className='loginbody'>
    <div className="container">
    <input type="checkbox" id="flip"/>
    <div className="cover">
      <div className="front">
        <img src="/frontImg.jpg" alt=""/>
        <div className="text">
          <span className="text-1">Every new friend is a <br/> new adventure</span>
          <span className="text-2">Let's get connected</span>
        </div>
      </div>
      <div className="back">
        <img className="backImg" src="/frontImg.jpg" alt=""/>
        <div className="text">
          <span className="text-1">Complete miles of journey <br/> with one step</span>
          <span className="text-2">Let's get started</span>
        </div>
      </div>
    </div>
    <div className="forms">
        <div className="form-content">
          <div className="login-form">
            <div className="title">Login</div>
          <form action="#">
            <div className="input-boxes">
              <div className="input-box">
                <i className="fas fa-envelope"></i>
                <input type="text" value={username} placeholder="Enter your username" required onChange={(e) => setUsername(e.target.value)}/>
              </div>
              <div className="input-box">
                <i className="fas fa-lock"></i>
                <input type="password" value={password} placeholder="Enter your password" required onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <div className="text"><a href="#">Forgot password?</a></div>
              <div className="button input-box">
                <input type="button" onClick={handleLogin} value="Sumbit"/>
              </div>
              <div className="text sign-up-text">Don't have an account? <label htmlFor="flip">Signup now</label></div>
            </div>
        </form>
      </div>
        <div className="signup-form">
          <div className="title">Signup</div>
        <form encType="multipart/form-data" action="#">
            <div className="input-boxes">
              <div className="input-box">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Enter your name" value={newusername} required onChange={(e) => setNewUsername(e.target.value)}/>
              </div>
              <div className="input-box">
                <i className="fas fa-envelope"></i>
                <input type="text" placeholder="Enter your email" value={newemail} required onChange={(e) => setNewEmail(e.target.value)}/>
              </div>
              <div className="input-box">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Enter your password" value={newpassword} required onChange={(e) => setNewPassword(e.target.value)}/>
              </div>
              <div className="input-box">
                <i className="fas fa-image"></i>
                <input type="file" onChange={handleImageChange} />
              </div>
              <div className="button input-box">
                <input type="button" onClick={handleSignup} value="Sumbit"/>
              </div>
              <div className="text sign-up-text">Already have an account? <label htmlFor="flip">Login now</label></div>
              
            </div>
            
            
      </form>
      
      
      
    </div>
    
    </div>
    
    </div>
    </div>
    
  </div>
  
  <div>{loginError ? <div className="error-message">{loginError}</div> : ''}</div>
  </div>
  
  );
};

export default Login;
