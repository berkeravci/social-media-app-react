import React, { useEffect,useState } from 'react';
import Story from './Story';
import WritePost from './WritePost';
import Post from './Post';
import '../../../Main.css';
import upload from '../../../assets/images/upload.png';
import member1 from '../../../assets/images/member-1.png';
import member2 from '../../../assets/images/member-2.png';
import member3 from '../../../assets/images/member-3.png';
import member4 from '../../../assets/images/member-4.png';
import { useUser } from '../../UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MiddleContent = () => {
  const { user, logoutUser } = useUser();
  const navigate = useNavigate();
  console.log("my token "+localStorage.getItem('token'));
  const [token, setToken] = useState(null);
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    // Check if token exists in localStorage
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      setToken(storedToken);
    } else {
      // Token doesn't exist, handle accordingly (e.g., redirect to login)
    }
  }, []);

  const handlePostSubmit = (postText) => {
    // Create a new post object
    const newPost = {
      text: postText,
      date: new Date().toLocaleDateString(), // you can format the date as needed
      username: user?.username,
    };

    // Update the posts state with the new post
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };


//   useEffect(() => {
//     if (!user) {
//       console.log('User is logged out');
//     }
//   }, [user]);



//   const handleLogout = async () => {
//     console.log('Before Logout - User:', user);
//     logoutUser();
//     // Perform any actions that need the user to be logged out here
//     navigate('/');
//     console.log("After",user)
  //};
//   const handleLogout = async () => {
    
  
//     try {
//       const storedToken = localStorage.getItem('token');
//       console.log('Token before request:', storedToken);
  
//       // Make the logout request to the server
//       const response = await axios.post("http://localhost:3001/api/logout", {}, {
//         headers: { Authorization: storedToken },
//       });
  
//       // If the server successfully logs out the user
//       // remove token from local storage and redirect to login page 
//       localStorage.removeItem('token');
//       navigate('/');
//       console.log(localStorage.getItem('token'));
//     } catch (e) {
//       console.error("Logout failed:", e);
//     }
//   };

  return (
    <div className="main-content">
      <div className="story-gallery">
        <Story imageSrc={upload} username="Post Story" storyClass="story1" />
        <Story imageSrc={member1} username="Alison" storyClass="story2" />
        <Story imageSrc={member2} username="Jackson" storyClass="story3" />
        <Story imageSrc={member3} username="Samona" storyClass="story4" />
        <Story imageSrc={member4} username="John Doe" storyClass="story5" />
      </div>
      <WritePost onPostSubmit={handlePostSubmit}></WritePost>
      
      {posts.map((post, index) => (
        <Post key={index} text={post.text} date={post.date} username={post.username} />
      ))}
      
      

      
      {/* <input type="button" onClick={handleLogout} value="Sign Out"></input> */}
      {/* ... other content ... */}
    </div>
  );
};

export default MiddleContent;
