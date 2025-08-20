import React, { useState } from 'react';
import doctorImage from '../images/doctorimg.jpg'; // Import the image

function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted');
  };

  return (
    <div className="container mx-auto p-4 pt-[15vh]">
      <h2 className="text-center text-2xl font-bold mb-8">Contact Us</h2>

      {/* Flex container for form and image */}
      <div className="flex items-stretch"> {/* Align items properly */}
        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="w-1/2 bg-white p-6 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Phone</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Topic</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={acceptTerms}
              onChange={() => setAcceptTerms(!acceptTerms)}
              required
            />
            <label className="text-sm">I accept the Terms and Conditions</label>
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={!acceptTerms}
          >
            Submit
          </button>
        </form>

        {/* Doctor Image */}
        <div className="w-1/2.5">
          <img
            src={doctorImage}
            alt="Doctor"
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
