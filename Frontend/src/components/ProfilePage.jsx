import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

const PatientProfilePage = () => {
    const { username } = useParams();
    const [userData, setUserData] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [virtualAppointments, setVirtualAppointments] = useState([]); // Virtual appointments state
    const [isEditing, setIsEditing] = useState(false);
    const [updatedData, setUpdatedData] = useState({
        username: '',
        dob: '',
        medicalHistory: '',
        bloodGroup: '',
        image: null,
    });
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${username}`);
                setUserData(response.data);
                setUpdatedData({
                    username: response.data.username,
                    dob: response.data.dob,
                    medicalHistory: response.data.medicalHistory,
                    bloodGroup: response.data.bloodGroup,
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchUserAppointments = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/appointments/${username}`);
                setAppointments(response.data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        const fetchVirtualAppointments = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/virtual-appointments/${username}`);
                setVirtualAppointments(response.data); // Set virtual appointments data
            } catch (error) {
                console.error('Error fetching virtual appointments:', error);
            }
        };

        fetchUserData();
        fetchUserAppointments();
        fetchVirtualAppointments(); // Fetch virtual appointments data
    }, [username]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData({ ...updatedData, [name]: value });
    };

    const handleFileChange = (e) => {
        setUpdatedData({ ...updatedData, image: e.target.files[0] });
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('dob', updatedData.dob);
        formData.append('medicalHistory', updatedData.medicalHistory);
        formData.append('bloodGroup', updatedData.bloodGroup);
        if (updatedData.image) {
            formData.append('image', updatedData.image);
        }

        try {
            const response = await axios.put(`http://localhost:5000/api/users/${username}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setUserData(response.data);
            setIsEditing(false);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile.');
        }
    };

    const handleShowDetails = (appointment) => {
        setSelectedAppointment(appointment);
    };

    const handleCloseModal = () => {
        setSelectedAppointment(null);
    };

    if (!userData) {
        return <div className="text-center p-4">Loading...</div>;
    }

    const age = calculateAge(userData.dob);

    return (
        <div className="container mx-auto p-8 max-w-5xl">
            <h1 className="text-4xl font-semibold mb-6 text-center">Patient Profile</h1>

            <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
                {isEditing ? (
                    <form onSubmit={handleUpdateSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                value={updatedData.dob}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Medical History</label>
                            <textarea
                                name="medicalHistory"
                                value={updatedData.medicalHistory}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Blood Group</label>
                            <input
                                type="text"
                                name="bloodGroup"
                                value={updatedData.bloodGroup}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Profile Picture</label>
                            <input
                                type="file"
                                name="image"
                                onChange={handleFileChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                            Save Changes
                        </button>
                    </form>
                ) : (
                    <>
                        <div className="flex items-center mb-6">
                            <img
                                src={`data:image/jpeg;base64,${userData.image}`}
                                alt="Profile"
                                className="w-32 h-32 rounded-full object-cover mr-6"
                            />
                            <div>
                                <h2 className="text-2xl font-bold">{userData.username}</h2>
                                <p className="text-gray-600">Age: {age}</p>
                                <p className="text-gray-600">Blood Group: {userData.bloodGroup}</p>
                            </div>
                        </div>
                        <p className="text-gray-700 mb-4">
                            <strong>Medical History:</strong> {userData.medicalHistory}
                        </p>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            Edit Profile
                        </button>
                    </>
                )}
            </div>

            <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
                <h2 className="text-3xl font-semibold mb-6">Appointments</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {appointments.length > 0 ? (
                        appointments.map((appointment, index) => (
                            <div
                                key={index}
                                className="border border-gray-200 rounded-lg shadow-md p-6 flex flex-col justify-between"
                            >
                                <div>
                                    <h3 className="text-lg font-bold mb-2">
                                        {appointment.doctorName}
                                    </h3>
                                    <p className="text-gray-600">
                                        <strong>Date:</strong> {appointment.date}
                                    </p>
                                    <p className="text-gray-600">
                                        <strong>Time:</strong> {appointment.time}
                                    </p>
                                    <p className="text-gray-600">
                                        <strong>Patient Name:</strong> {appointment.patientName}
                                    </p>
                                </div>
                                <button
                                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                                    onClick={() => handleShowDetails(appointment)}
                                >
                                    Show Details
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No appointments found.</p>
                    )}
                </div>
            </div>

            {/* Virtual Appointments Section */}
            <div className="bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-3xl font-semibold mb-6">Virtual Appointments</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {virtualAppointments.length > 0 ? (
                        virtualAppointments.map((virtualAppointment, index) => (
                            <div
                                key={index}
                                className="border border-gray-200 rounded-lg shadow-md p-6 flex flex-col justify-between"
                            >
                                <div>
                                    <h3 className="text-lg font-bold mb-2">
                                        {virtualAppointment.doctorName}
                                    </h3>
                                    <p className="text-gray-600">
                                        <strong>Date:</strong> {virtualAppointment.date}
                                    </p>
                                    <p className="text-gray-600">
                                        <strong>Time:</strong> {virtualAppointment.time}
                                    </p>
                                    <p className="text-gray-600">
                                        <strong>Consultation Link:</strong> <a href={virtualAppointment.link} className="text-blue-500" target="_blank" rel="noopener noreferrer">Join here</a>
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No virtual appointments found.</p>
                    )}
                </div>
            </div>

            {selectedAppointment && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4">{selectedAppointment.doctorName}</h2>
                        <p className="text-gray-600">
                            <strong>Specialty:</strong> {selectedAppointment.specialty}
                        </p>
                        <p className="text-gray-600">
                            <strong>Date:</strong> {selectedAppointment.date}
                        </p>
                        <p className="text-gray-600">
                            <strong>Time:</strong> {selectedAppointment.time}
                        </p>
                        <p className="text-gray-600">
                            <strong>Location:</strong> {selectedAppointment.location}
                        </p>
                        <p className="text-gray-600">
                            <strong>Fees:</strong> ₹{selectedAppointment.fees}
                        </p>
                        <p className="text-gray-600">
                            <strong>Patient Name:</strong> {selectedAppointment.patientName}
                        </p>
                        <button
                            className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
                            onClick={handleCloseModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PatientProfilePage;
