import React from 'react';
import PropTypes from 'prop-types';
import '../../../Main.css';
import livevideo from '../../../assets/images/live-video.png';
import photo from '../../../assets/images/photo.png';
import feeling from '../../../assets/images/feeling.png';
import { useUser } from '../../UserContext';
import axios from 'axios';
import { useEffect,useState } from 'react';
import { resolvePath } from 'react-router-dom';
//import image from '../../uploads/5b8e1b1f84f99a81f5b4c628dd5a1f5e';
//import im from './uploads/5b8e1b1f84f99a81f5b4c628dd5a1f5e'

const WritePost = ({onPostSubmit}) => {//
  const { user } = useUser();
  const [postText, setPostText] = useState('');
  const [image, setImage] = useState(null);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Call the onPostSubmit function with the post text
      onPostSubmit(postText);
      // Clear the textarea after submitting
      setPostText('');
    }
  };

  const handlePhotoSelection = (e) =>{
    const file = e.target.files[0];
    setImage(file);
    console.log(file);
  }
  //const [path, setPath] = useState('');

//   useEffect(() => {
//     // Construct the image path
//     if (user?.profileImage) {

//     //     const imagePath = `../../${user.profileImage}`;
//     // console.log('Image Path:', imagePath);

//     // // Check if the image is accessible
//     // fetch(imagePath)
//     //   .then((response) => console.log('Image Found:', response))
//     //   .catch((error) => console.error('Image Not Found:', error));

//     const imagePath = require(`../../${user.profileImage}`);
//     console.log('Image Path:', imagePath);
//     setPath(imagePath.default);
//     }
//   }, [user]);

//   useEffect(() => {
//     // Check for the token in local storage
//     const token = localStorage.getItem('token');

//     if (token) {
//       // Fetch user information using the token
//       axios.get('/api/user', {
//         headers: {
//           Authorization: token,
//         },
//       })
//         .then((response) => {
//           const userData = response.data;
//           // Set user data in your state
//           setUser(userData);
//         })
//         .catch((error) => console.error('Error fetching user:', error));
//     }
//   }, []);

  // Check if user is not available yet
  //const os = require('os');
  ///Users/berker/Desktop/ReactJS/social-media-app/src/uploads/5b8e1b1f84f99a81f5b4c628dd5a1f5e
  const username = user?.username;
   const profileImage = user?.profileImage;
    const path = require(`../../../uploads/${profileImage}`);
    
//const path = "Users/berker/Desktop/ReactJS/social-media-app/src/uploads/5b8e1b1f84f99a81f5b4c628dd5a1f5e";
//    console.log(require(`../../${profileImage}`));
//   //console.log(user.profileImage);
// //   console.log(user);
// //   console.log(user.username);
    //const myimg = require('../../uploads/5b8e1b1f84f99a81f5b4c628dd5a1f5e');
    //console.log(myimg)
//const path = require('../../uploads/Screen Shot 2023-12-04 at 20.59.04.png');
  return (
    <div className="write-post-container">
      <div className="user-profile">
        <img src={path}/>
        {/* <img src={`../../${profileImage}`} alt=''/> */}
        <div>
          <p>{username}</p>
          <small>Public <i className="fas fa-caret-down"></i></small>
        </div>
      </div>

      <div className="post-input-container">
        <textarea rows="3" placeholder={`What's on your mind, ${username}?`} value={postText}
          onChange={(e) => setPostText(e.target.value)}
          onKeyPress={handleKeyPress}></textarea>
        <div className="add-post-links">
          <a href="#"><img src={livevideo} alt="Live Video" /> Live Video</a>
          <input type='file' onChange={handlePhotoSelection}/>
          <a href="#"><img src={feeling} alt="Feeling/Activity" /> Feeling/Activity</a>
        </div>
      </div>
    </div>
  );
};

export default WritePost;
