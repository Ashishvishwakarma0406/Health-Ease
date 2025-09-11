// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn, setUsername }) => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Use env variable

  // Handle input changes
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || " Login successful.");
        setIsLoggedIn(true);
        setUsername(data.username);
        localStorage.setItem("token", data.token); // Save JWT
        navigate("/");
      } else {
        alert(data.error || data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("⚠️ An error occurred while logging in. Please try again.");
    }
  };

  // Redirect to Register Page
  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLoginSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* Username */}
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1 font-medium">
            Username
          </label>
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

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
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

        {/* Buttons */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Login
        </button>
        <button
          type="button"
          className="w-full mt-4 bg-gray-300 py-2 rounded-md hover:bg-gray-400 transition"
          onClick={navigateToRegister}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;
