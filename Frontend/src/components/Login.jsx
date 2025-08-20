// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn, setUsername }) => {
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const navigate = useNavigate();
    const API_BASE_URL = 'http://localhost:5000';  // Backend URL

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.message || 'Login successful.');
                setIsLoggedIn(true);
                setUsername(data.username);
                localStorage.setItem('token', data.token); // Store JWT token
                navigate('/');
            } else {
                alert(data.message || 'Login failed.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('An error occurred while logging in.');
        }
    };

    // Navigate to the register page when the register button is clicked
    const navigateToRegister = () => {
        navigate('/register');
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form
                onSubmit={handleLoginSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <div className="mb-4">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={loginData.username}
                        onChange={handleLoginChange}
                        required
                        className="w-full px-4 py-2 border rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        required
                        className="w-full px-4 py-2 border rounded-md"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
                    Login
                </button>
                <button
                    type="button"
                    className="w-full mt-4 bg-gray-300 py-2 rounded-md"
                    onClick={navigateToRegister}
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Login;
