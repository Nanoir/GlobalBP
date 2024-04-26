// src/App.jsx
import React, { useState } from 'react';
import './App.css';
import AuthModal from './components/AuthModal';
import axios from 'axios';
import Main from './components/Main';
import useAuth from './hooks/useAuth';

function App() {
  const { isLoggedIn, username, userID, handleLoginSuccess, handleLogout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="h-screen">
      <Main
        isLoggedIn={isLoggedIn}
        username={username}
        userID={userID}
        handleLogout={handleLogout}
        handleToggleModal={handleToggleModal}
      />
      <div className={`modal-container ${isModalOpen ? 'open' : ''}`} onClick={handleCloseModal}>
        <div
          className={`modal p-6 bg-white rounded-lg shadow-md ${isModalOpen ? 'open' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          <AuthModal onLoginSuccess={(...args) => { handleLoginSuccess(...args); handleCloseModal(); }} />
        </div>
      </div>
    </div>
  );
}

export default App;
