import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState(''); // 改成 username
  const [password, setPassword] = useState('');
  const [userID, setUserID] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    // 发送登录请求到后端
    const loginData = {
      username: username, // 改成 username
      password: password,
    };

    if (!username || !password) {
      toast.error('请填写所有必填字段');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/login', loginData);

      if (response.status === 200) {
        console.log('Login successful');
        setUsername(response.data.username);
        setUserID(response.data.userID)
        localStorage.setItem('access_token', response.data.accessToken);
        localStorage.setItem('refresh_token', response.data.refreshToken);
        onLoginSuccess(response.data.accessToken, response.data.refreshToken, username, response.data.userID);

      } else {
        // 处理登录失败的错误消息
        console.log(response.data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center w-96">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <ToastContainer />
      <form onSubmit={handleLogin}>
        <div className="input-container">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2"
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2"
          />
        </div>
        
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
