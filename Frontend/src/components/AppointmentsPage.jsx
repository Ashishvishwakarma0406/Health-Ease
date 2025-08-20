import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function AppointmentPage() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isBooking, setIsBooking] = useState(false);
  const [formData, setFormData] = useState({
    doctor: null,
    patientName: '',
    date: '',
    time: '',
    email: '',
    phone: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/doctors');
        setDoctors(response.data);
        setFilteredDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        alert('Failed to fetch doctors');
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    const filtered = doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDoctors(filtered);
  }, [searchTerm, doctors]);

  const handleBookClick = (doctor) => {
    setFormData({ ...formData, doctor });
    setIsBooking(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.doctor) {
      alert('Please select a doctor.');
      return;
    }

    const appointmentData = {
      doctorId: formData.doctor._id,
      patientName: formData.patientName,
      email: formData.email,
      phone: formData.phone,
      doctorName: formData.doctor.name,
      specialty: formData.doctor.specialty,
      hospital: formData.doctor.hospital,
      location: formData.doctor.location,
      fees: formData.doctor.fees,
      date: formData.date,
      time: formData.time,
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate("/login"); // Redirect to login page
        return;
      }

      await axios.post('http://localhost:5000/api/users/appointments', appointmentData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Appointment booked successfully');
      setIsBooking(false);
    } catch (error) {
      console.error('Error booking appointment:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        alert('Your session has expired. Please log in again.');
        localStorage.removeItem('token'); // Clear invalid token
        navigate("/login"); // Redirect to login page
      } else {
        alert('Error booking appointment. Please try again.');
      }
    }
  };

  return (
    <div className="p-6 mt-[10vmin]">
      <h1 className="text-3xl font-bold text-center mb-6">Select a Doctor</h1>

      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Doctor Name or Location"
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div key={doctor._id} className="bg-white p-4 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold">{doctor.name}</h3>
              <p className="text-gray-600">{doctor.specialty}</p>
              <p className="text-gray-500 mt-2">{doctor.hospital}</p>
              <p className="text-gray-500 mt-2">Location: {doctor.location}</p>
              <p className="text-gray-500 mt-2">Fee: ₹{doctor.fees}</p>
              <button
                onClick={() => handleBookClick(doctor)}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Book Appointment
              </button>
            </div>
          ))
        ) : (
          <p>No doctors found for the selected criteria</p>
        )}
      </div>

      {isBooking && formData.doctor && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-2xl font-semibold mb-4">Book Appointment with {formData.doctor.name}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Patient Name"
                value={formData.patientName}
                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                className="w-full p-2 mb-4 border rounded-md"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2 mb-4 border rounded-md"
              />
              <input
                type="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2 mb-4 border rounded-md"
              />
              <div className="flex space-x-4 mb-4">
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsBooking(false)} // Back button to close the modal
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppointmentPage;