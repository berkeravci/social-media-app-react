import React from 'react';
import newsImage from '../../assets/images/news.png';
import friendsImage from '../../assets/images/friends.png';
import groupImage from '../../assets/images/group.png';
import marketplaceImage from '../../assets/images/marketplace.png';
import watchImage from '../../assets/images/watch.png';
import shortcut1Image from '../../assets/images/shortcut-1.png';
import shortcut2Image from '../../assets/images/shortcut-2.png';
import shortcut3Image from '../../assets/images/shortcut-3.png';
import shortcut4Image from '../../assets/images/shortcut-4.png';
import mainstyle from '../../Main.css';

const LeftBar = () => {
    return (
    
        <div className="left-sidebar">
            <div className="imp-links">
                <a href="#"><img src={newsImage} alt="Latest News"/> Latest News</a>
                <a href="#"><img src={friendsImage} alt="Friends"/> Friends</a>
                <a href="#"><img src={groupImage} alt="Groups"/> Groups</a>
                <a href="#"><img src={marketplaceImage} alt="Marketplace"/> Marketplace</a>
                <a href="#"><img src={watchImage} alt="Watch"/> Watch</a>
                <a href="#">See More</a>
            </div>
            <div className="shortcut-links">
                <p>Your Shortcuts</p>
                <a href="#"><img src={shortcut1Image} alt="Web Developers"/> Web Developers</a>
                <a href="#"><img src={shortcut2Image} alt="Web Design Course"/> Web Design Course</a>
                <a href="#"><img src={shortcut3Image} alt="Full Stack Development"/> Full Stack Development</a>
                <a href="#"><img src={shortcut4Image} alt="Website Experts"/> Website Experts</a>
            </div>
        </div>
        
    );
};

export default LeftBar;
