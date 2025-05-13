import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, Bell, User, GraduationCap, Home, FileText, ShieldCheck, MessageSquare, ChevronDown } from 'lucide-react';
import UserChatPage from './UserChatPage';
import axios from 'axios';

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
  // Sidebar navigation items
  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'My Documents', icon: FileText, path: '/documents' },
    { name: 'Verification Status', icon: ShieldCheck, path: '/verification' },
    { name: 'Academic Records', icon: GraduationCap, path: '/records' },
  ];

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
                  Bona CredVerify
                </span>
              </Link>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

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
                  <span className="ml-2">John Doe</span>
                </button>
              </div>
               <button
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
      <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-600 dark:text-gray-400 text-sm text-center">
              © {new Date().getFullYear()} Bona University Credential Verification System. 
              All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserLayout;