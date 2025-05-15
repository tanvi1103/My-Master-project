import React, { useState, useEffect } from "react";
import {
  FiHome,
  FiUsers,
  FiFileText,
  FiSettings,
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiLogOut,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegistrarLayout = ({ children, currentUser }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const authurl = import.meta.env.VITE_AUTH_ROUTE;

  const [darkMode, setDarkMode] = useState(() => {
    // Check user's preferred color scheme
    return (
      localStorage.getItem("darkMode") === "true" ||
      (!("darkMode" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarOpen && !event.target.closest("#sidebar")) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!currentUser) {
        setIsLoading(false); // Prevent endless spinner
      }
    }, 5000); // fallback timeout of 5s

    if (currentUser && currentUser.role) {
      setIsLoading(false);
      clearTimeout(timeout);
    }

    return () => clearTimeout(timeout);
  }, [currentUser]);

  if (isLoading || !currentUser) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  const handleLogout = async () => {
  try {
    await axios.post(`${authurl}/logout`, {}, { withCredentials: true });
    localStorage.removeItem("token"); // Clear any stored tokens
    navigate("/registrar/login"); // Redirect to login page
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

  return currentUser?.role === "registrar" ? (
    <div className={`flex flex-col min-h-screen ${darkMode ? "dark" : ""}`}>
      {/* Navbar */}
      <header className="bg-white dark:bg-gray-800 shadow-md z-100">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo and title */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none"
            >
              {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                R
              </div>
              <h1 className="ml-2 text-xl font-semibold text-gray-800 dark:text-white">
                Registrar Portal
              </h1>
            </div>
          </div>

          {/* User controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            
            {/* User profile */}
{currentUser && currentUser.role === "registrar" ? (
  <div className="flex items-center space-x-4">
    {/* Dark mode toggle */}
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle dark mode"
    >
      {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
    </button>

    {/* User profile dropdown container */}
    <div className="relative group">
      <div className="flex items-center space-x-2 cursor-pointer">
        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center overflow-hidden">
          {currentUser.photo ? (
            <img 
              src={currentUser.photo} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-blue-600 dark:text-white font-bold text-lg">
              {currentUser.firstName.charAt(0)}
            </span>
          )}
        </div>
        <div className="hidden md:block">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {currentUser.firstName} {currentUser.lastName}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Registrar
          </p>
        </div>
      </div>

      {/* Dropdown menu */}
      <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
        <div className="px-4 py-3">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {currentUser.email}
          </p>
        </div>
        <div className="py-1">
          <Link
            to="/registrar/profile"
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <FiSettings className="mr-2" size={16} />
            Update Profile
          </Link>
          <Link
            to="/registrar/settings"
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <FiSettings className="mr-2" size={16} />
            Account Settings
          </Link>
        </div>
        <div className="py-1">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <FiLogOut className="mr-2" size={16} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  </div>
) : (
  // ... your existing fallback

              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <span className="text-blue-600 dark:text-white font-bold">
                    U
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  User
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  User Role
                </p>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop */}
        <aside
          id="sidebar"
          className={`fixed md:sticky top-0 z-600 w-64 h-full-screen bg-white dark:bg-gray-800 shadow-md transform transition-transform duration-300 ease-in-out 
             ${
               sidebarOpen ? "translate-x-0" : "-translate-x-full"
             } md:translate-x-0 overflow-hidden`}
        >
          <div className="h-full flex flex-col overflow-y-auto ">
            {/* Non-scrollable nav content */}
            <nav className="flex-1 px-4 py-6 overflow-hidden">
              <ul className="space-y-2">
                <li>
                  <Link
                    to={"/registrar"}
                    className="flex items-center px-4 py-3 rounded-lg bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-300"
                  >
                    <FiHome className="mr-3" />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/registrar/studentRecords"}
                    className="flex items-center px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <FiUsers className="mr-3" />
                    <span>Students</span>
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <FiFileText className="mr-3" />
                    <span>Records</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <FiSettings className="mr-3" />
                    <span>Settings</span>
                  </a>
                </li>
              </ul>
            </nav>

            {/* Sidebar footer - always visible at bottom */}
            <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700 ">
              {currentUser && currentUser.role === "registrar" ? (
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-300 font-medium">
                      <img
                        src={currentUser?.photo}
                        alt="User Avatar"
                        className="w-full h-full rounded-full"
                      />
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      {currentUser?.firstName} {currentUser?.lastName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Registrar
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Registrar
                </p>
              )}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto  bg-gray-50 dark:bg-gray-900 p-4 md:p-6 ">
          {/* Overlay for mobile sidebar */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
              onClick={() => setSidebarOpen(false)}
            ></div>
          )}

          {/* Page content */}
          <div className="max-w-7xl mx-auto">
            {/* Page header */}
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Dashboard
              </h2>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  New Student
                </button>
              </div>
            </div>

            {/* Content area - passed as children */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-6">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 z-100">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} University Registrar System. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  ) : (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col justify-center items-center flex-1">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            You are not authorized to access this page.
          </h1>
          <Link
            to="/registrar/login"
            className="text-blue-600 hover:underline mt-4 "
          >
            Please log in to continue.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrarLayout;
