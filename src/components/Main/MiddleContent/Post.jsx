import React from "react";
import feed1 from '../../../assets/images/feed-image-1.png';
import { useUser } from '../../UserContext';
import like from '../../../assets/images/like-blue.png';
import comment from '../../../assets/images/comments.png';
import share from '../../../assets/images/share.png';


const Post = ({text,date,username}) =>{
    // const { user } = useUser();
    // const username = user?.username;
    // const profileImage = user?.profileImage;
    // const path = require(`../../../uploads/${profileImage}`);

    return(
        <div className="post-container">
        <div className="post-row">
            <div className="user-profile">
                {/* <img src={path}/> */}
                <div>
                    <p>{username}</p>
                    <span>{date}</span>
                </div>
            </div>
            <a href="#"><i className="fas fa-ellipsis-v"></i></a>
        </div>
        <p className="post-text">{text}</p>
        <img src={feed1} className="post-img"/>
        <div className="post-row">
            <div className="activity-icons">
                <div><img src={like}/> 120</div>
                <div><img src={comment}/> 45</div>
                <div><img src={share}/> 20</div>
            </div>
            
        </div>

    </div>
    )
}

export default Post;