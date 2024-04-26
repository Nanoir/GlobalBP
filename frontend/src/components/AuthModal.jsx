// src/components/AuthModal.jsx
import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

const AuthModal = ({ onLoginSuccess, onClose }) => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleToggleForm = (formType) => {
    setIsLoginForm(formType === 'login');
  };

  return (
    <div className="flex flex-col gap-4 items-center w-96">
      {isLoginForm ? (
        <Login onLoginSuccess={onLoginSuccess} />
      ) : (
        <Signup onSignupSuccess={onLoginSuccess} />
      )}

      <div className="form-toggle-buttons">
        {isLoginForm ? (
          <>
            <button onClick={() => handleToggleForm('signup')}>Signup</button>

          </>
        ) : (
          <button onClick={() => handleToggleForm('login')}>Back to Login</button>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
