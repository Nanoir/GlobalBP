import React from 'react';
import ChessDatabase from './ChessForm';
import Gambling from './Gambling'

const Main = ({
  isLoggedIn,
  username,
  userID,
  handleLogout,
  handleToggleModal
}) => {
  
  return (
    <div className="h-screen">
       <div className="fixed inset-0 flex justify-center items-center w-50 h-20">
            <h1 className>Welcome</h1>
      </div>
  
      {isLoggedIn ? (
        <div className="fixed top-0 right-0 flex items-center justify-end p-4">
          <div className="user-info-container">
            <p className="text-gray-600">Welcome, {username}, UserID: {userID}!</p>
          </div>
          <div className="logout-container">
            <button
              className="bg-grey-500 text-black px-4 py-2 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="button-container p-4">
          <button
            className="bg-grey-500 text-black px-4 py-2 rounded"
            onClick={handleToggleModal}
          >
            Login / Signup
          </button>
        </div>
      )}
    
      {isLoggedIn && (
        <div className='flex'>
            <div className='mt-24 w-1/2'>
            <ChessDatabase></ChessDatabase>
            </div>
            <div className='mt-24 w-1/2'>
            <Gambling userID={userID}></Gambling>
            </div>
        </div>
      )}
    </div>
  );
  
  
  
};

export default Main;
