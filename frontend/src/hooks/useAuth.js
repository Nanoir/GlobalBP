// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [userID, setUserID] = useState('');

    useEffect(() => {
        const authenticateUser = async () => {
            const accessToken = localStorage.getItem('access_token');
            const refreshToken = localStorage.getItem('refresh_token');

            if (accessToken && refreshToken) {
                try {
                    const response = await axios.post(
                        'http://127.0.0.1:8000/verify_token',
                        null,
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                                'Content-Type': 'application/json',
                            },
                        }
                    );

                    if (response.status === 200) {
                        setIsLoggedIn(true);
                        setUsername(response.data.username);
                        setUserID(response.data.id);
                    }
                } catch (error) {
                    console.error('Error verifying jwt:', error);
                    setIsLoggedIn(false);
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                }
            }
        };

        authenticateUser();
    }, []);

    const handleLoginSuccess = (accessToken, refreshToken, username, userID) => {
        setIsLoggedIn(true);
        setUsername(username);
        setUserID(userID);

        // Store tokens in localStorage
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);

        // Schedule token refresh before expiration
        scheduleTokenRefresh();
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    };

    const scheduleTokenRefresh = () => {
        const refreshToken = localStorage.getItem('refresh_token');
        const refreshInterval = 6 * 24 * 60 * 60 * 1000; // 6 days in milliseconds

        setInterval(async () => {
            try {
                const response = await axios.post(
                    'http://127.0.0.1:8000/refresh_token',
                    { refresh_token: refreshToken },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (response.status === 200) {
                    localStorage.setItem('access_token', response.data.access_token);
                }
            } catch (error) {
                console.error('Error refreshing token:', error);
                handleLogout();
            }
        }, refreshInterval);
    };

    return {
        isLoggedIn,
        username,
        userID,
        handleLoginSuccess,
        handleLogout,
    };
};

export default useAuth;
