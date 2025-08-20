import React, { useState, useEffect } from 'react';
import axios from 'axios';
import imagePath from '../images/ai-healthcare-desktop.webp';
import { useNavigate } from 'react-router-dom';

function OnlineConsultation() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    doctorName: '',
    doctorId: '', // Store doctorId here
    date: '',
    time: '',
    symptoms: '',
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch doctors data
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/doctors');
        const doctorData = response.data;
        setDoctors(doctorData);
        setFilteredDoctors(doctorData); // Initially, show all doctors
        
        // Extract unique locations from doctor data
        const uniqueLocations = [...new Set(doctorData.map(doctor => doctor.location))];
        setLocations(uniqueLocations); // Set the locations in the state
        setLoading(false);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setResponseMessage('Failed to fetch doctor data.');
      }
    };

    fetchDoctors();
  }, []);

  // Handle changes in form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // If location changes, filter the doctors
    if (name === 'location') {
      filterDoctors(value); // Filter doctors based on location
    }

    // If doctorName changes, update doctorId and doctorName
    if (name === 'doctorName') {
      const selectedDoctor = doctors.find(doctor => doctor.name === value);
      if (selectedDoctor) {
        setFormData({ ...formData, doctorId: selectedDoctor._id, doctorName: selectedDoctor.name });
      }
    }
  };

  // Filter doctors based on location
  const filterDoctors = (location) => {
    if (location === '') {
      setFilteredDoctors(doctors); // If location is empty, show all doctors
    } else {
      setFilteredDoctors(
        doctors.filter(doctor =>
          doctor.location.toLowerCase().includes(location.toLowerCase())
        )
      );
    }
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Or wherever you're storing the JWT token

    if (!token) {
      navigate("/login"); // Redirect to login page if no token is found
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/book-appointment', formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the request headers
        },
      });
      setResponseMessage(response.data.message);
      alert('Appointment booked successfully');
    } catch (error) {
      console.error(error);
      alert('Error booking the appointment. Please try again.');
    }
  };

  // Get today's date in YYYY-MM-DD format for the date input
  const today = new Date().toISOString().split('T')[0];

  return (
    <div
      className="relative bg-center pt-[12vmin] pb-[10vmin]"
      style={{
        backgroundImage: `url(${imagePath})`,
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 md:px-8">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Book Your Virtual Appointment
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          We prioritize the safety of our patients and aim to provide transparent, timely care. Get expert consultations from our experienced doctors.
        </p>

        <h2 className="mt-8 text-2xl md:text-3xl font-semibold">
          Get Expert Medical Consultation
        </h2>
        <p className="mt-4 text-sm md:text-lg max-w-2xl mx-auto">
          Our doctors provide expert medical advice and consultation. Book your virtual appointment now and consult our team.
        </p>

        <div className="mt-12 p-6 md:p-8 rounded-lg shadow-xl max-w-3xl w-full mx-auto backdrop-blur-xl bg-white/20 border border-white/30">
          <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
            
            {/* Name Input */}
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-[#0095DE] text-black placeholder-gray-500 bg-white backdrop-blur-md"
            />
            
            {/* Email Input */}
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-[#0095DE] text-black placeholder-gray-500 bg-white backdrop-blur-md"
            />

            {/* Location Dropdown */}
            <select
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-[#0095DE] text-black placeholder-gray-500 bg-white backdrop-blur-md"
            >
              <option value="">Select Location</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>

            {/* Doctor Dropdown */}
            <select
              name="doctorName"
              value={formData.doctorName}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-[#0095DE] text-black placeholder-gray-500 bg-white backdrop-blur-md"
            >
              <option value="">Select Doctor</option>
              {loading ? (
                <option>Loading doctors...</option>
              ) : (
                filteredDoctors.map((doctor) => (
                  <option key={doctor._id} value={doctor.name}>
                    {doctor.name} - {doctor.specialty} ({doctor.location})
                  </option>
                ))
              )}
            </select>

            {/* Date Input */}
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              min={today} // Set minimum date to today
              className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-[#0095DE] text-black placeholder-gray-500 bg-white backdrop-blur-md"
            />

            {/* Time Input */}
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              min="10:00" // Set minimum time to 10:00 AM
              max="22:00" // Set maximum time to 10:00 PM
              className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-[#0095DE] text-black placeholder-gray-500 bg-white backdrop-blur-md"
            />

            {/* Symptoms Input */}
            <textarea
              name="symptoms"
              placeholder="Symptoms"
              value={formData.symptoms}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-[#0095DE] text-black placeholder-gray-500 bg-white backdrop-blur-md"
            />
            
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#0095DE] text-white py-3 px-6 rounded-md hover:bg-[#007bbd]"
            >
              Book Now
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default OnlineConsultation;
