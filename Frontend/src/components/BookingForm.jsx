import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const checkups = [
  { id: 1, name: 'General Health Checkup', description: 'A complete health checkup covering major health parameters.' },
  { id: 2, name: 'Cardiac Checkup', description: 'A detailed heart health checkup including ECG, stress test, etc.' },
  { id: 3, name: 'Diabetes Checkup', description: 'A comprehensive test to check blood sugar levels and related risks.' },
  { id: 4, name: 'Kidney Checkup', description: 'Tests related to kidney function and overall health.' },
  { id: 5, name: 'Full Body Checkup', description: 'An extensive checkup for all major organs and functions.' },
  { id: 6, name: 'Thyroid Checkup', description: 'Tests for thyroid function and related issues.' },
  { id: 7, name: 'Liver Checkup', description: 'Tests to assess liver health and functionality.' },
  { id: 8, name: 'Respiratory Checkup', description: 'Checkup for respiratory health including lung function tests.' },
  { id: 9, name: 'Cancer Screening', description: 'Screening tests for early detection of cancer in different organs.' },
  { id: 10, name: 'Pregnancy Checkup', description: 'Complete checkup for expecting mothers to monitor pregnancy progress.' },
  { id: 11, name: 'Bone Health Checkup', description: 'Tests to assess bone density and overall bone health.' },
  { id: 12, name: 'Eye Checkup', description: 'Comprehensive eye checkup to test vision and detect common eye diseases.' },
];

function BookingForm() {
  const { checkupId } = useParams(); // Get checkupId from URL parameters
  const [selectedCheckup, setSelectedCheckup] = useState(null);

  useEffect(() => {
    const checkup = checkups.find(c => c.id === parseInt(checkupId));
    setSelectedCheckup(checkup);
  }, [checkupId]);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [state, setState] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Here, you can call an API to book the checkup or store the details in state.
    setSuccessMessage(`Your ${selectedCheckup.name} has been successfully booked!`);
    setName('');
    setAge('');
    setContactNumber('');
    setPreferredDate('');
    setAddressLine1('');
    setAddressLine2('');
    setPostalCode('');
    setState('');
  };

  if (!selectedCheckup) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center pt-[12vh]"> {/* Add pt-[12vh] for top padding */}
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6 text-[#333]">Book Your {selectedCheckup.name}</h2>

        {successMessage && (
          <div className="bg-green-200 text-green-800 p-4 mb-6 rounded-md text-center">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleFormSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-4 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium">Contact Number</label>
            <input
              type="tel"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full p-4 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium">Preferred Date for Checkup</label>
            <input
              type="date"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              className="w-full p-4 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Address Section */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium">Address</label>
            <input
              type="text"
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
              placeholder="Address Line 1"
              className="w-full p-4 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <input
              type="text"
              value={addressLine2}
              onChange={(e) => setAddressLine2(e.target.value)}
              placeholder="Address Line 2 (Optional)"
              className="w-full p-4 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6 flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Postal Code</label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-full p-4 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full p-4 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <p className="text-lg font-semibold text-gray-700">Selected Checkup: <span className="text-blue-600">{selectedCheckup.name}</span></p>
            <p className="text-gray-600">{selectedCheckup.description}</p>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#A7E2FF] to-[#0095DE] text-white rounded-md text-lg font-semibold transition duration-300 ease-in-out hover:bg-blue-500"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;
