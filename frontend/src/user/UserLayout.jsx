import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, Bell, User, GraduationCap, Home, FileText, ShieldCheck, MessageSquare, ChevronDown } from 'lucide-react';
import UserChatPage from './UserChatPage';
import axios from 'axios';
import { FaFacebook, FaLinkedin, FaMapMarkerAlt, FaTwitter } from 'react-icons/fa';
import Swal from 'sweetalert2';
import LoadingSpinner from '../pages/LoadingSpinner';

const UserLayout = ({ children }) => {
    const [chatMinimized, setChatMinimized] = useState(false);
    const sidebarRef = useRef();
      const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const chatRef = useRef();
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // Theme handling
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
          setSidebarOpen(false);
        }
        if (chatRef.current && !chatRef.current.contains(event.target) && 
            !event.target.closest('.chat-trigger')) {
          setShowChat(false);
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

  // Fetch current user data
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/me', {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem('token')}` 
          }
        });
        setCurrentUser(res.data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching current user:', err);
        const timer = setTimeout(() => {
          navigate('/login');
        }, 2000);
        return () => clearTimeout(timer);
      }
    };
    fetchCurrentUser();
  }, []);
  // Handle logout
// const handleAdminLogout = async () => {
//   try {
//     // 1. First make the logout request to server
//     await axios.get("http://localhost:5000/api/admin/logout", { 
//       withCredentials: true 
//     });

//     // 2. Then clear client-side state
//     localStorage.removeItem('token');
//     setCurrentUser(null);
    
//     // 3. Show success message
//     await Swal.fire({
//       title: "Success", 
//       text: "🎉 Logout Successful!", 
//       icon: "success",
//       timer: 1500,  // Auto close after 1.5 seconds
//       showConfirmButton: false
//     });

//     // 4. Navigate to login
//     navigate("/login");

//   } catch (error) {
//     console.error("Logout error:", error);
    
//     // Fallback client-side logout if server fails
//     localStorage.removeItem('token');
//     setCurrentUser(null);
    
//     await Swal.fire({
//       title: "Error",
//       text: "❌ Logout Failed - You have been signed out locally",
//       icon: "error"
//     });
    
//     navigate("/login");
//   }
// }

const handleAdminLogout = async () => {
  try {
    // Show loading indicator
    const swalInstance = Swal.fire({
      title: 'Logging out...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // 1. Attempt server logout
    try {
      await axios.get("http://localhost:5000/api/admin/logout", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
    } catch (serverError) {
      console.warn("Server logout failed, proceeding with client-side cleanup:", serverError);
      // Continue with client-side cleanup even if server logout fails
    }

    // 2. Clear client-side state
    localStorage.removeItem('token');
    sessionStorage.removeItem('tempData'); // Clear any session storage if used
    setCurrentUser(null);
    
    // 3. Close loading and show success
    await Swal.fire({
      title: "Logged Out", 
      html: '<div class="flex flex-col items-center">' +
            '<svg class="w-16 h-16 text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
            '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />' +
            '</svg>' +
            '<p class="text-lg">You have been successfully logged out</p>' +
            '</div>',
      showConfirmButton: false,
      timer: 2000
    });

    // 4. Redirect to login with state clear
    navigate("/login", { 
      replace: true,
      state: {
        from: null // Clear any navigation state
      } 
    });

    // 5. Force reload to ensure complete cleanup (optional)
    window.location.reload();

  } catch (error) {
    console.error("Unexpected logout error:", error);
    
    // Comprehensive client-side cleanup
    localStorage.removeItem('token');
    sessionStorage.clear();
    setCurrentUser(null);
    
    await Swal.fire({
      title: "Session Ended",
      html: '<div class="flex flex-col items-center">' +
            '<svg class="w-16 h-16 text-yellow-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
            '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />' +
            '</svg>' +
            '<p class="text-lg">Your session has been cleared</p>' +
            '</div>',
      showConfirmButton: true,
      confirmButtonText: 'Back to Login'
    });
    
    navigate("/login", { replace: true });
  }
};
  // Sidebar navigation items
  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'My Documents', icon: FileText, path: '/documents' },
    { name: 'Verification Status', icon: ShieldCheck, path: '/verification' },
    { name: 'Academic Records', icon: GraduationCap, path: '/records' },
  ];

  if( isLoading) {
    return (
        <LoadingSpinner />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="fixed top-0 w-full z-40 bg-white dark:bg-gray-800 shadow-sm">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Section */}
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                <Menu className="w-6 h-6" />
              </button>
              <Link to="/" className="ml-4 flex items-center">
                <GraduationCap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">
                  BUGCVS
                </span>
              </Link>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">


              <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                <Bell className="w-5 h-5" />
                <span className="sr-only">View notifications</span>
              </button>
          <button 
            onClick={() => setShowChat(!showChat)}
            className="chat-trigger relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <MessageSquare className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

              <div className="ml-4 relative">
                <button className="flex items-center text-sm text-gray-800 dark:text-white focus:outline-none">
                  <User className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  <img
                    src={currentUser?.photo || 'https://via.placeholder.com/150'}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full ml-2"
                  />
                  <span className="ml-2">{currentUser?.firstName + " " + currentUser?.lastName}</span>
                </button>
              </div>
               <button
            onClick={handleAdminLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors shadow-sm"
          >
            Logout
          </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b dark:border-gray-700">
          <span className="text-lg font-semibold text-gray-800 dark:text-white">
            Navigation
          </span>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden p-2 text-gray-500 dark:text-gray-400"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <item.icon className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="pt-16 md:ml-64 min-h-screen">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>

            {showChat && (
              <div
                ref={chatRef}
                className="fixed bottom-4 right-4 z-50 w-full max-w-2xl h-[70vh] bg-white dark:bg-gray-800 rounded-xl shadow-2xl flex flex-col border dark:border-gray-700"
              >
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-xl">
                  <h3 className="font-semibold text-lg">BUGCVS help chat</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setChatMinimized(!chatMinimized)}
                      className="p-1 hover:bg-black/10 rounded-md"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setShowChat(false)}
                      className="p-1 hover:bg-black/10 rounded-md"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className={`flex-1 overflow-hidden transition-all duration-300 ${chatMinimized ? 'h-0' : 'h-full'}`}>
                  <UserChatPage currentUser={currentUser} />
                </div>
              </div>
            )}

      {/* Footer */}
      <footer className="bg-gray-800 sticky dark:bg-gray-950 text-white py-8 px-6 z-200">
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

export default UserLayout;