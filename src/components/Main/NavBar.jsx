import React, { useState,useRef } from "react";
import notification from '../../assets/images/notification.png';
import inbox from '../../assets/images/inbox.png';
import video from '../../assets/images/video.png';
import search from '../../assets/images/search.png';
import logo from '../../assets/images/logo2.png';
import profilePic from '../../assets/images/profile-pic.png';
import feedback from '../../assets/images/feedback.png';
import setting from '../../assets/images/setting.png';
import help from '../../assets/images/help.png';
import display from '../../assets/images/display.png';
import logout from '../../assets/images/logout.png';
import arrow from '../../assets/images/arrow.png';
import { useUser } from '../UserContext'
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const NavBar = () => {
    
  const navigate = useNavigate();
  console.log("my token "+localStorage.getItem('token'));
  const [token, setToken] = useState(null);
    const [isSettingsMenuOpen, setSettingsMenuOpen] = useState(false);
    const { user } = useUser();
    const username = user?.username;
    const profileImage = user?.profileImage;
    const path = require(`../../uploads/${profileImage}`);
    // Function to toggle the settings menu
    const toggleSettingsMenu = () => {
        setSettingsMenuOpen((prevIsOpen) => !prevIsOpen);
    };
    const handleLogout = async () => {
    
  
        try {
          const storedToken = localStorage.getItem('token');
          console.log('Token before request:', storedToken);
      
          // Make the logout request to the server
          const response = await axios.post("http://localhost:3001/api/logout", {}, {
            headers: { Authorization: storedToken },
          });
      
          // If the server successfully logs out the user
          // remove token from local storage and redirect to login page 
          localStorage.removeItem('token');
          navigate('/');
          console.log(localStorage.getItem('token'));
        } catch (e) {
          console.error("Logout failed:", e);
        }
      };
    return (
        <nav>
            <div className="nav-left">
                <a href="index.html"><img src={logo} className="logo" alt="Logo" /></a>
                <ul>
                    <li><img src={notification} alt="Notification" /></li>
                    <li><img src={inbox} alt="Inbox" /></li>
                    <li><img src={video} alt="Video" /></li>
                </ul>
            </div>

            <div className="nav-right">
                <div className="search-box">
                    <img src={search} alt="Search" />
                    <input type="text" placeholder="Search" />
                </div>
                {/* Pass the function reference to onClick using an arrow function */}
                <div className="nav-user-icon online" onClick={toggleSettingsMenu}>
                    <img src={path} alt="Profile" />
                </div>
            </div>

            {/* ------dropdown-settings-menu--------- */}
            <div
                className={`settings-menu ${isSettingsMenuOpen ? 'settings-menu-height' : ''}`}
            >
                <div id="dark-btn">
                    <span></span>
                </div>
                <div className="settings-menu-inner">
                    <div className="user-profile">
                        <img src={path} alt="Profile" />
                        <div>
                            <p>{username}</p>
                            <a href="profile.html">See your profile</a>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="user-profile">
                        <img src={feedback} alt="Feedback" />
                        <div>
                            <p>Give Feedback</p>
                            <a href="">Help us improve the new design</a>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="settings-links">
                        <img src={setting} className="settings-icon" alt="Settings" />
                        <a href="">Settings & Privacy <img src={arrow} width="10px" alt="Arrow" /></a>
                    </div>
                    <div className="settings-links">
                        <img src={help} className="settings-icon" alt="Help" />
                        <a href="">Help & Support <img src={arrow} width="10px" alt="Arrow" /></a>
                    </div>
                    <div className="settings-links">
                        <img src={display} className="settings-icon" alt="Display" />
                        <a href="">Display & Accessibility <img src={arrow} width="10px" alt="Arrow" /></a>
                    </div>
                    <div className="settings-links">
                        <img src={logout} className="settings-icon" alt="Logout" />
                        <a href="" onClick={handleLogout} >Logout <img src={arrow} width="10px" alt="Arrow"/></a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
