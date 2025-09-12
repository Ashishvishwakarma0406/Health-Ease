import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaStethoscope,
  FaAmbulance,
  FaBed,
  FaHeartbeat,
  FaTint,
  FaBars,
  FaTimes,
} from "react-icons/fa";

function Navbar({ isLoggedIn, username, setIsLoggedIn, setUsername }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token from local storage
    setIsLoggedIn(false); // Update the login state
    setUsername(""); // Clear the username
    navigate("/"); // Redirect to home page
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
    setShowDropdown(false); // close dropdown when toggling mobile menu
  };

  return (
    <nav className="fixed top-[2vmin] w-full z-50 shadow-md bg-[#F3F3F3]">
      <div className="h-[8vh] flex items-center justify-between px-6 md:px-16">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="Logo" className="w-12 h-12" />
          <Link to="/">
            <div className="w-[15vmin] p-[1vmin] text-[2.5vmin] text-center rounded-md text-white bg-gradient-to-r from-[#A7E2FF] to-[#0095DE]">
              HealthEase
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
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
              aria-haspopup="true"
              aria-expanded={showDropdown}
            >
              SERVICES
            </button>
            {showDropdown && (
              <div
                className="absolute top-[100%] left-0 bg-white shadow-lg rounded-md mt-2 w-[25vmin] text-left z-50"
                role="menu"
              >
                <ul className="text-[1.8vmin]">
                  <li
                    onClick={() => setShowDropdown(false)}
                    className="px-[2vmin] py-[1vmin] hover:bg-gray-200 flex items-center gap-[1vmin]"
                    role="menuitem"
                  >
                    <FaStethoscope />
                    <Link to="/services/consultation">Online Consultation</Link>
                  </li>
                  <li
                    onClick={() => setShowDropdown(false)}
                    className="px-[2vmin] py-[1vmin] hover:bg-gray-200 flex items-center gap-[1vmin]"
                    role="menuitem"
                  >
                    <FaAmbulance />
                    <Link to="/services/ambulance">Ambulance Services</Link>
                  </li>
                  <li
                    onClick={() => setShowDropdown(false)}
                    className="px-[2vmin] py-[1vmin] hover:bg-gray-200 flex items-center gap-[1vmin]"
                    role="menuitem"
                  >
                    <FaBed />
                    <Link to="/services/beds">Bed Availability</Link>
                  </li>
                  <li
                    onClick={() => setShowDropdown(false)}
                    className="px-[2vmin] py-[1vmin] hover:bg-gray-200 flex items-center gap-[1vmin]"
                    role="menuitem"
                  >
                    <FaHeartbeat />
                    <Link to="/services/checkup">Body Checkup</Link>
                  </li>
                  <li
                    onClick={() => setShowDropdown(false)}
                    className="px-[2vmin] py-[1vmin] hover:bg-gray-200 flex items-center gap-[1vmin]"
                    role="menuitem"
                  >
                    <FaTint />
                    <Link to="/services/blood-bank">Blood Bank</Link>
                  </li>
                  <li
                    onClick={() => setShowDropdown(false)}
                    className="px-[2vmin] py-[1vmin] hover:bg-gray-200 flex items-center gap-[1vmin]"
                    role="menuitem"
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

        {/* Right login/logout and mobile menu button */}
        <div className="flex items-center gap-4">
          {/* Desktop login/logout shown only on md and up */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Link
                  to={`/profile/${username}`}
                  className="w-[15vmin] p-[1vmin] text-[2vmin] text-center rounded-md text-white bg-gradient-to-r from-[#A7E2FF] to-[#0095DE]"
                >
                  {username}
                </Link>
                <button
                  className="w-[15vmin] p-[1vmin] text-[2vmin] text-center rounded-md text-white bg-gradient-to-r from-[#A7E2FF] to-[#0095DE]"
                  onClick={handleLogout}
                >
                  LOGOUT
                </button>
              </>
            ) : (
              <Link to="/login">
                <div className="w-[15vmin] p-[1vmin] text-[2vmin] text-center rounded-md text-white bg-gradient-to-r from-[#A7E2FF] to-[#0095DE]">
                  LOGIN
                </div>
              </Link>
            )}
          </div>

          {/* Mobile menu button shown only on small screens */}
          <button
            className="md:hidden text-3xl focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F3F3F3] px-6 pb-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "block py-2 text-blue-600" : "block py-2 hover:text-blue-500"
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            HOME
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "block py-2 text-blue-600" : "block py-2 hover:text-blue-500"
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            ABOUT
          </NavLink>
          <NavLink
            to="/MedicineOrder"
            className={({ isActive }) =>
              isActive ? "block py-2 text-blue-600" : "block py-2 hover:text-blue-500"
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            MEDICINES
          </NavLink>

          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full text-left py-2 focus:outline-none"
            aria-haspopup="true"
            aria-expanded={showDropdown}
          >
            SERVICES
          </button>
          {showDropdown && (
            <ul className="pl-4 text-[1.8vmin]">
              <li
                onClick={() => {
                  setShowDropdown(false);
                  setMobileMenuOpen(false);
                }}
                className="py-1 hover:bg-gray-200 flex items-center gap-2"
              >
                <FaStethoscope />
                <Link to="/services/consultation">Online Consultation</Link>
              </li>
              <li
                onClick={() => {
                  setShowDropdown(false);
                  setMobileMenuOpen(false);
                }}
                className="py-1 hover:bg-gray-200 flex items-center gap-2"
              >
                <FaAmbulance />
                <Link to="/services/ambulance">Ambulance Services</Link>
              </li>
              <li
                onClick={() => {
                  setShowDropdown(false);
                  setMobileMenuOpen(false);
                }}
                className="py-1 hover:bg-gray-200 flex items-center gap-2"
              >
                <FaBed />
                <Link to="/services/beds">Bed Availability</Link>
              </li>
              <li
                onClick={() => {
                  setShowDropdown(false);
                  setMobileMenuOpen(false);
                }}
                className="py-1 hover:bg-gray-200 flex items-center gap-2"
              >
                <FaHeartbeat />
                <Link to="/services/checkup">Body Checkup</Link>
              </li>
              <li
                onClick={() => {
                  setShowDropdown(false);
                  setMobileMenuOpen(false);
                }}
                className="py-1 hover:bg-gray-200 flex items-center gap-2"
              >
                <FaTint />
                <Link to="/services/blood-bank">Blood Bank</Link>
              </li>
              <li
                onClick={() => {
                  setShowDropdown(false);
                  setMobileMenuOpen(false);
                }}
                className="py-1 hover:bg-gray-200 flex items-center gap-2"
              >
                <FaTint />
                <Link to="/services/report_analyzer">Report Analyzer</Link>
              </li>
            </ul>
          )}

          <NavLink
            to="/appointment"
            className={({ isActive }) =>
              isActive ? "block py-2 text-blue-600" : "block py-2 hover:text-blue-500"
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            APPOINTMENT
          </NavLink>
          <NavLink
            to="/articles"
            className={({ isActive }) =>
              isActive ? "block py-2 text-blue-600" : "block py-2 hover:text-blue-500"
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            ARTICLES
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "block py-2 text-blue-600" : "block py-2 hover:text-blue-500"
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            CONTACT
          </NavLink>

          {!isLoggedIn ? (
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              <div className="mt-4 w-full p-[1vmin] text-[2vmin] text-center rounded-md text-white bg-gradient-to-r from-[#A7E2FF] to-[#0095DE]">
                LOGIN
              </div>
            </Link>
          ) : (
            <div className="mt-4 flex flex-col gap-2">
              <Link
                to={`/profile/${username}`}
                className="w-full p-[1vmin] text-center rounded-md text-white bg-gradient-to-r from-[#A7E2FF] to-[#0095DE]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {username}
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full p-[1vmin] text-center rounded-md text-white bg-gradient-to-r from-[#A7E2FF] to-[#0095DE]"
              >
                LOGOUT
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
