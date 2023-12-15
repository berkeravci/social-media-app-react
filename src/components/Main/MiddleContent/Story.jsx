import React from 'react';
import '../../../Main.css';

const Story = ({ imageSrc, username, storyClass }) => {
    const combinedClass = `story ${storyClass}`;
  
    return (
      <div className={combinedClass}>
        <img src={imageSrc} alt={username} />
        <p>{username}</p>
      </div>
    );
  };

export default Story;