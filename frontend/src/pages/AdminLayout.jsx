// import React, { useState, useEffect, useRef } from "react";
// import AdminSidebar from "./AdminSidebar";
// import ThemeToogler from "./ThemeToogler";
// import Notifications from "./Notifications";
// import { Menu } from "lucide-react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import ChatIcon from "../chat/ChatIcon";
// import ChatPage from "../chat/ChatPage";
// const AdminLayout = ({ children }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const sidebarRef = useRef();
//    const [showChat, setShowChat] = useState(false);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const navigate = useNavigate();

//       const [currentUser, setCurrentUser] = useState(null);
  
//    // Fetch current user on mount

  

//   // Click outside to close sidebar (mobile)
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
//         setSidebarOpen(false);
//       }
//     };
//     if (sidebarOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [sidebarOpen]);

//   // Logout
//   const handleAdminLogout = async () => {
//     try {
//       await axios.get("http://localhost:5000/api/admin/logout", { withCredentials: true });
//       Swal.fire("Success", "🎉 Admin Logout Successful!", "success");
//       navigate("/admin/login");
//     } catch (error) {
//       Swal.fire("Error", "❌ Admin Logout Failed", "error");
//     }
//   };

//       useEffect(() => {
//       const fetchCurrentUser = async () => {
//         try {
//           const res = await axios.get('http://localhost:5000/api/auth/me', {
//             headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
//           });
//           setCurrentUser(res.data);
//         } catch (err) {
//           console.error('Error fetching current user:', err);
//         }
//       };
  
//       fetchCurrentUser();
//     }, []);
  
//     if (!currentUser) {
//       return <div>Loading...</div>;
//     }

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col md:flex-row">
//       {/* Navbar */}
//       <nav className="fixed top-0 left-0 w-full z-30 flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 shadow-md">
//         <div className="flex items-center gap-4">
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="md:hidden text-gray-800 dark:text-white"
//           >
//             <Menu size={24} />
//           </button>
//           <span className="font-bold text-lg text-gray-900 dark:text-white">BUGCVS</span>
//         </div>
//         <div className="flex items-center gap-4">
//           <ThemeToogler />
//               <ChatIcon 
//       unreadCount={unreadCount}
//       onClick={() => setShowChat(!showChat)}
//     />
//     <ChatPage  currentUser={currentUser}/>
//           <div className="grid gap-6">
//       {/* other admin widgets */}
//       <Notifications />
//     </div>
//           <button
//             onClick={handleAdminLogout}
//             className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
//           >
//             Logout
//           </button>
//         </div>
//       </nav>

//       {/* Sidebar */}
//       <div
//         ref={sidebarRef}
//         className={`fixed top-16 md:top-0 left-0 z-20 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out 
//         ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
//       >
//         <AdminSidebar />
//       </div>

//       {/* Main content */}
//       <main className="flex-1 md:ml-64 overflow-auto p-6 md:p-8 mt-16 max-w-7xl mx-auto">
//   {children}

//    {showChat && (
//     <div className="fixed bottom-4 right-4 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50">
//       <AdminChat onClose={() => setShowChat(false)} />
//     </div>
//   )}
// </main>
//     </div>
//   );
// };

// export default AdminLayout;




// AdminLayout.jsx
import React, { useState, useEffect, useRef } from "react";
import AdminSidebar from "./AdminSidebar";
import ThemeToogler from "./ThemeToogler";
import Notifications from "./Notifications";
import { Menu, X, MessageSquare, ChevronDown } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ChatPage from "../chat/ChatPage";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const sidebarRef = useRef();
  const chatRef = useRef();
  const navigate = useNavigate();



   // Click outside handlers
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

  // Click outside to close sidebar (mobile)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };
    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  // Logout
  const handleAdminLogout = async () => {
    try {
      await axios.get("http://localhost:5000/api/admin/logout", { 
        withCredentials: true 
      });
      Swal.fire("Success", "🎉 Admin Logout Successful!", "success");
      navigate("/admin/login");
    } catch (error) {
      Swal.fire("Error", "❌ Admin Logout Failed", "error");
    }
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/me', {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem('adminToken')}` 
          }
        });
        setCurrentUser(res.data);
      } catch (err) {
        console.error('Error fetching current user:', err);
      }
    };
    fetchCurrentUser();
  }, []);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-40 flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            BUGCVS
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToogler />
          <Notifications />
          
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
          
          <button
            onClick={handleAdminLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors shadow-sm"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-16 md:top-0 left-0 z-30 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <main className={`pt-16 md:ml-64 transition-all duration-300 ${sidebarOpen ? 'blur-sm' : ''}`}>
        {children}
      </main>

      {/* Chat Window */}
      {showChat && (
        <div
          ref={chatRef}
          className="fixed bottom-4 right-4 z-50 w-full max-w-md h-[70vh] bg-white dark:bg-gray-800 rounded-xl shadow-2xl flex flex-col border dark:border-gray-700"
        >
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-xl">
            <h3 className="font-semibold text-lg">Admin Chat</h3>
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
            <ChatPage currentUser={currentUser} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;