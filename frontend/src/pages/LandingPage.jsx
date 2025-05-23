
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiSun, FiMoon, FiMenu, FiX, FiArrowRight } from "react-icons/fi";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaMapMarkerAlt,
  FaQuoteLeft,
} from "react-icons/fa";
import FAQSection from "../user/FAQSection";

const LandingPage = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Apply dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Auto-scrolling testimonials
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonials = [
    {
      id: 1,
      company: "Ethio Telecom",
      logo: "/ethio-telecom-logo.png",
      quote:
        "Bonga University's verification system saved us 60% time in employee credential checks.",
    },
    {
      id: 2,
      company: "Commercial Bank of Ethiopia",
      logo: "/cbe-logo.png",
      quote:
        "Highly reliable for document authentication. A game-changer for HR processes.",
    },
    {
      id: 3,
      company: "Awash Bank",
      logo: "/awash-bank-logo.png",
      quote:
        "Integrating this system streamlined our graduate recruitment verification.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/bonga-university-logo.png"
              alt="Bonga University Logo"
              className="h-12 w-auto"
            />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              BU Graduate Verification System
            </span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Home
            </Link>
            <Link
              to="/login"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Verify
            </Link>
            <Link
              to=""
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              About
            </Link>
            <Link
              to=""
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            {/* Replace the dark mode button with this dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                <span>Login As</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
                <div className="py-1">
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    External User
                  </Link>
                  <Link
                    to="/registrar/login"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Registrar
                  </Link>
                  <Link
                    to="/admin/login"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Admin
                  </Link>
                </div>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg mt-2 py-2 px-4">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className="py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Home
              </Link>
              <Link
                to="/login"
                className="py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Verify
              </Link>
              <Link
                to=""
                className="py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                About
              </Link>
              <Link
                to=""
                className="py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-grow p-6 max-w-7xl mx-auto w-full">{children}</main>

      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70 z-10"></div>
        <img
          // src="/graduation-ceremony.jpg"
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Graduation Ceremony"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 px-4 text-white max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Verify Graduate Credentials Instantly
          </h1>
          <p className="text-xl mb-8">
            Bonga University's secure digital platform for authenticating
            academic documents. Trusted by employers nationwide.
          </p>
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center"
          >
            Verify Now <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </section>

      {/* System Description */}
      <section className="py-16 px-6 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            How Our System Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 - Login/Signup */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Login/Signup
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Create an account or login to access the verification system.
              </p>
              <div className="mt-4 flex justify-center space-x-3">
                <Link
                  to="/login"
                  className="text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white py-2 px-4 rounded-lg"
                >
                  Sign Up
                </Link>
              </div>
            </div>

            {/* Step 2 - Submit Document */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Submit Document
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Enter the graduate's details to initiate verification.
              </p>
            </div>

            {/* Step 3 - Instant Verification */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Instant Verification
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our system cross-checks with Bonga University's secure database.
              </p>
            </div>

            {/* Step 4 - Get Results */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Get Results
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Receive a digitally signed report within seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-gray-100 dark:bg-gray-700">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Who's Happy With Our System
          </h2>
          <div className="relative h-64 overflow-hidden">
            <div
              className="flex transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="min-w-full px-4">
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
                    <FaQuoteLeft className="text-blue-600 text-3xl mb-4" />
                    <p className="text-gray-700 dark:text-gray-300 text-lg italic">
                      {testimonial.quote}
                    </p>
                    <div className="flex items-center mt-6">
                      <img
                        src={testimonial.logo}
                        alt={testimonial.company}
                        className="h-12 mr-4"
                      />
                      <span className="font-bold dark:text-white">{testimonial.company}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
              <FAQSection />
      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-950 text-white py-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Bonga University</h3>
            <p className="mb-2">P.O. Box: 334, Bonga, Ethiopia</p>
            <p className="mb-2">Email: info@bongau.edu.et</p>
            <p>Phone: +251 XX XXX XXXX</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/verify" className="hover:text-blue-400">
                  Verify Documents
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Find Us</h3>
            <div className="mb-4">
              <a
                href="https://www.google.com/maps/place/Bonga+University"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-blue-400"
              >
                <FaMapMarkerAlt className="mr-2" />
                View on Google Maps
              </a>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/bongau"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={24} className="hover:text-blue-400" />
              </a>
              <a
                href="https://twitter.com/bongau"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={24} className="hover:text-blue-400" />
              </a>
              <a
                href="https://linkedin.com/school/bonga-university"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={24} className="hover:text-blue-400" />
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-4 border-t border-gray-700 text-center">
          <p>
            &copy; {new Date().getFullYear()} Bonga University. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
