import React from 'react';
import homeImage from './21449.jpg'; // Adjust the path based on your project structure

const Home = () => {
  return (
    <div className='header' style={{textAlign: 'center'}} >
      <h1>Welcome to Home page</h1>
      <img src={homeImage} alt="Home" style={{width: '100%', height: '10%'}} />
    </div>
  );
};

export default Home;
