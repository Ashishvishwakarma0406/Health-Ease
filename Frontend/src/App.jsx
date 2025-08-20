import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Services from './components/Services';
import Login from './components/Login';
import Register from './components/Register';
import ProfilePage from './components/ProfilePage';
import AboutUs from './components/AboutUs';
import AmbulanceService from './components/AmbulanceService';
import ContactUs from './components/ContactUs';
import AppointmentPage from './components/AppointmentsPage';
import OnlineConsultation from './components/OnlineConsultation';
import BloodDonationPage from './components/BloodDonationPage';
import ReportAnalyzer from './components/ReportAnalyzer';
import ArticlesPage from './components/ArticlesPage';
import MedicineOrder from './components/MedicineOrder';
import AddressPage from './components/AddressPage';
import CheckupList from './components/CheckupList';
import BookingForm from './components/BookingForm';
import BedAvailability from './components/BedAvailability'; // New import

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            const user = JSON.parse(atob(token.split('.')[1]));
            setUsername(user.username);
        }
    }, []);

    return (
        <div>
            <Navbar isLoggedIn={isLoggedIn} username={username} setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/register" element={<Register />} />
                <Route path="/appointment" element={<AppointmentPage />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/ambulance" element={<AmbulanceService />} />
                <Route path="/services/consultation" element={<OnlineConsultation />} />
                <Route path="/services/blood-bank" element={<BloodDonationPage />} />
                <Route path="/services/beds" element={<BedAvailability />} /> {/* New BedAvailability route */}
                <Route path="/services/report_analyzer" element={<ReportAnalyzer />} />
                <Route path="/articles" element={<ArticlesPage />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/profile/:username" element={<ProfilePage />} />
                <Route path="/MedicineOrder" element={<MedicineOrder />} />
                <Route path="/address" element={<AddressPage />} />
                <Route path="/services/checkup" element={<CheckupList />} />
                <Route path="/book/:checkupId" element={<BookingForm />} />
            </Routes>
        </div>
    );
}

export default App;
