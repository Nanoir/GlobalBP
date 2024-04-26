// src/components/Signup.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username || !password || !email) {
      toast.error('请填写所有必填字段');
      return;
    }

    if (!email.includes('@')) {
      toast.error('请输入正确的邮箱');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error('密码必须至少包含8个字符，且需由大小写英文字母和数字混合组成');
      return;
    }

    const usernameRegex = /^[a-zA-Z0-9]{4,}$/;
    if (!usernameRegex.test(username)) {
      toast.error('用户名必须大于四个字符，且只能是英文');
      return;
    }

    const signupData = {
      username: username,
      password: password,
      email: email
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/signup', signupData);

      if (response.status === 200) {
        toast.success('注册成功！');
        console.log('Signup successful');
      }
    } catch (error) {
      if (error.response) {
        const statusCode = error.response.status;
        if (statusCode === 401) {
          toast.error('用户名已被占用，请选择其他用户名');
        } else if (statusCode === 402) {
          toast.error('该邮箱已被注册，请使用其他邮箱');
        } else {
          toast.error('注册失败，请稍后再试');
        }
      } else {
        console.error('Error during signup:', error);
        toast.error('注册失败，发生了错误，请稍后再试');
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center w-96">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <ToastContainer />
      <form onSubmit={handleSignup} className="flex flex-col gap-4">
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
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
