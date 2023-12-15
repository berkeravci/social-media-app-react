import React from 'react';
import { useUser } from '../components/UserContext';

const MainPage = () => {
    const { user } = useUser();

    return (
      <div>
        <h1>Main Pagee</h1>
        {user && <p>Welcome, {user.username}!</p>}
        {/* Add your main page content here */}
      </div>
    );
    
};

export default MainPage;