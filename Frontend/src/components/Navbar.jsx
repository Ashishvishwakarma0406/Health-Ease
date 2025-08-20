import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaStethoscope, FaAmbulance, FaBed, FaHeartbeat, FaDollarSign, FaTint, } from "react-icons/fa";

function Navbar({ isLoggedIn, username, setIsLoggedIn, setUsername }) {
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token from local storage
    setIsLoggedIn(false); // Update the login state
    setUsername(""); // Clear the username
  };
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="fixed top-[2vmin] w-full z-50 shadow-md">
      <div className="h-[8vh] bg-[#F3F3F3] flex items-center justify-between px-6 md:px-16">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="Logo" className="w-12 h-12" />
          <Link to="/">
            <div className="w-[15vmin] p-[1vmin] text-[2.5vmin] text-center rounded-md text-white bg-gradient-to-r from-[#A7E2FF] to-[#0095DE]">
              HealthEase
            </div>
          </Link>
        </div>

        <div className="hidden md:flex gap-6 text-[2vmin]">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-600" : "hover:text-blue-500"
            }
          >
            HOME
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-blue-600" : "hover:text-blue-500"
            }
          >
            ABOUT
          </NavLink>
          <NavLink
            to="/MedicineOrder"
            className={({ isActive }) =>
              isActive ? "text-blue-600" : "hover:text-blue-500"
            }
          >
            MEDICINES
          </NavLink>
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="focus:outline-none"
            >
              SERVICES
            </button>
            {showDropdown && (
              <div className="absolute top-[100%] left-0 bg-white shadow-lg rounded-md mt-2 w-[25vmin] text-left">
                <ul className="text-[1.8vmin]">
                  <li
                    onClick={() => setShowDropdown(false)} // Close the dropdown
                    className="px-[2vmin] py-[1vmin] hover:bg-gray-200 flex items-center gap-[1vmin]"
                  >
                    <FaStethoscope />
                    <Link to="/services/consultation">Online Consultation</Link>
                  </li>
                  <li
                    onClick={() => setShowDropdown(false)} // Close the dropdown
                    className="px-[2vmin] py-[1vmin] hover:bg-gray-200 flex items-center gap-[1vmin]"
                  >
                    <FaAmbulance />
                    <Link to="/services/ambulance">Ambulance Services</Link> {/* Ensure this route points to the correct AmbulanceServices component */}
                  </li>
                  <li
                    onClick={() => setShowDropdown(false)} // Close the dropdown
                    className="px-[2vmin] py-[1vmin] hover:bg-gray-200 flex items-center gap-[1vmin]"
                  >
                    <FaBed />
                    <Link to="/services/beds">Bed Availability</Link>
                  </li>
                  <li
                    onClick={() => setShowDropdown(false)} // Close the dropdown
                    className="px-[2vmin] py-[1vmin] hover:bg-gray-200 flex items-center gap-[1vmin]"
                  >
                    <FaHeartbeat />
                    <Link to="/services/checkup">Body Checkup</Link>
                  </li>
                  <li
                    onClick={() => setShowDropdown(false)} // Close the dropdown
                    className="px-[2vmin] py-[1vmin] hover:bg-gray-200 flex items-center gap-[1vmin]"
                  >
                    <FaTint />
                    <Link to="/services/blood-bank">Blood Bank</Link>
                  </li>
                  <li
                    onClick={() => setShowDropdown(false)} // Close the dropdown
                    className="px-[2vmin] py-[1vmin] hover:bg-gray-200 flex items-center gap-[1vmin]"
                  >
                    <FaTint />
                    <Link to="/services/report_analyzer">Report Analyzer</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <NavLink
            to="/appointment"
            className={({ isActive }) =>
              isActive ? "text-blue-600" : "hover:text-blue-500"
            }
          >
            APPOINTMENT
          </NavLink>
          <NavLink
            to="/articles"
            className={({ isActive }) =>
              isActive ? "text-blue-600" : "hover:text-blue-500"
            }
          >
            ARTICLES
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-blue-600" : "hover:text-blue-500"
            }
          >
            CONTACT
          </NavLink>
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Link
                to={`/profile/${username}`}
                className="w-[15vmin] p-[1vmin] text-[2vmin] text-center rounded-md text-white bg-gradient-to-r from-[#A7E2FF] to-[#0095DE]"
              >
                {username}
              </Link>
              <Link to="/">
                <button
                  className="w-[15vmin] p-[1vmin] text-[2vmin] text-center rounded-md text-white bg-gradient-to-r from-[#A7E2FF] to-[#0095DE]"
                  onClick={handleLogout}
                >
                  LOGOUT
                </button>
              </Link>
            </div>
          ) : (
            <Link to="/login">
              <div className="w-[15vmin] p-[1vmin] text-[2vmin] text-center rounded-md text-white bg-gradient-to-r from-[#A7E2FF] to-[#0095DE]">
                LOGIN
              </div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
