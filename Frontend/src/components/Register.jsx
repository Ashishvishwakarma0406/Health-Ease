    // Register.js (React component)
    import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';

    function Register() {
        const [formData, setFormData] = useState({
            uniqueId: '',
            username: '',
            email: '',
            phoneNo: '',
            password: '',
        });

        const navigate = useNavigate();

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };

        const handleSubmit = async (e) => {
            e.preventDefault();

            if (!formData.uniqueId || !formData.username || !formData.email || !formData.phoneNo || !formData.password) {
                alert('Please fill all required fields');
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();
                if (response.ok) {
                    alert(data.message || 'Registration successful.');
                    navigate('/login');  // Redirect to the login page after successful registration
                } else {
                    alert(data.message || 'Registration failed.');
                }
            } catch (error) {
                console.error('Error registering:', error);
                alert('An error occurred while registering.');
            }
        };

        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

                    <div className="mb-4">
                        <label htmlFor="uniqueId" className="block">Aadhaar ID:</label>
                        <input
                            type="text"
                            name="uniqueId"
                            value={formData.uniqueId}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="username" className="block">Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phoneNo" className="block">Phone Number:</label>
                        <input
                            type="text"
                            name="phoneNo"
                            value={formData.phoneNo}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
                        Register
                    </button>
                </form>
            </div>
        );
    }

    export default Register;
