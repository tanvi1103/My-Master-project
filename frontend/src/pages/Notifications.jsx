// import React, { useState, useEffect, useRef, useCallback } from "react";
// import axios from "axios";
// import { BellIcon, XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";
// import { motion, AnimatePresence } from "framer-motion";

// const Notifications = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [selectedNationalId, setSelectedNationalId] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [isOpen, setIsOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const dropdownRef = useRef(null);

//   const apiUrl = import.meta.env.VITE_ADMIN_ROUTE
//   const nationalIdUrl = import.meta.env.VITE_NATIONAL_ID_ROUTE
//   // Fetch notifications
//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const { data } = await axios.get(`${apiUrl}/notifications`);
//         setNotifications(data);
//         setUnreadCount(data.filter((n) => !n.read).length);
//       } catch (err) {
//         console.error("Fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNotifications();

//     // Real-time polling (every 30s)
//     const interval = setInterval(fetchNotifications, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const markAsRead = useCallback((id) => {
//     setNotifications((prev) =>
//       prev.map((note) => (note._id === id ? { ...note, read: true } : note))
//     );
//     setUnreadCount((prev) => prev - 1);
//   }, []);

//   const markAllAsRead = () => {
//     setNotifications((prev) => prev.map((note) => ({ ...note, read: true })));
//     setUnreadCount(0);
//   };

//   // Fetch national ID when a notification is clicked
//   const handleNotificationClick = async (notification) => {
//     try {
//       // Destructure required fields from the notification object
//       const { firstName, middleName, lastName, gender } = notification;

//       // Log the parameters to ensure they are being passed correctly
//       console.log("Sending params:", { firstName, middleName, lastName, gender });

//       // Make the API request
//       const response = await axios.get(`${nationalIdUrl}/search/name`, {
//         params: { firstName, middleName, lastName, gender },
//       });

//       // Set the fetched national ID
//       setSelectedNationalId(response.data);
//     } catch (err) {
//       console.error("Error fetching national ID:", err);
//       setSelectedNationalId("Error fetching national ID");
//     }
//   };

//   const handleDeleteNotification = async (id) => {
//     try {
//       // Send a DELETE request to the backend
//       await axios.delete(`${apiUrl}/notifications/${id}`);

//       // Update the state to remove the deleted notification
//       setNotifications((prev) => prev.filter((note) => note._id !== id));
//       setUnreadCount((prev) => prev - 1);
//     } catch (err) {
//       console.error("Error deleting notification:", err);
//     }
//   };

//   return (
//     <div className="relative" ref={dropdownRef}>
//       {/* Notification Trigger */}
//       <motion.button
//         whileTap={{ scale: 0.95 }}
//         onClick={() => setIsOpen(!isOpen)}
//         className="p-2 rounded-full relative hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//         aria-label="Notifications"
//       >
//         <BellIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
//         {unreadCount > 0 && (
//           <motion.span
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
//           >
//             {unreadCount}
//           </motion.span>
//         )}
//       </motion.button>

//       {/* Dropdown */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ type: "spring", damping: 20 }}
//             className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl ring-1 ring-black/10 dark:ring-gray-600 z-50"
//           >
//             <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
//               <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
//                 Notifications {unreadCount > 0 && `(${unreadCount})`}
//               </h2>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={markAllAsRead}
//                   disabled={unreadCount === 0}
//                   className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
//                   aria-label="Mark all as read"
//                 >
//                   <CheckIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
//                 </button>
//                 <button
//                   onClick={() => setIsOpen(false)}
//                   className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
//                   aria-label="Close"
//                 >
//                   <XMarkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
//                 </button>
//               </div>
//             </div>

//             <div className="max-h-96 overflow-y-auto">
//               {loading ? (
//                 [...Array(3)].map((_, i) => (
//                   <div key={i} className="p-4 border-b border-gray-100 dark:border-gray-700">
//                     <div className="animate-pulse flex space-x-3">
//                       <div className="rounded-full bg-gray-300 dark:bg-gray-600 h-3 w-3 mt-1" />
//                       <div className="flex-1 space-y-2">
//                         <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
//                         <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               ) : notifications.length === 0 ? (
//                 <div className="p-4 text-center text-gray-500 dark:text-gray-400">
//                   No new notifications
//                 </div>
//               ) : (
//                 notifications.map((note) => (
//                   <motion.div
//                     key={note._id}
//                     layout
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-colors ${
//                       !note.read ? "bg-blue-50 dark:bg-gray-700" : "hover:bg-gray-50 dark:hover:bg-gray-750"
//                     }`}
//                     onClick={() => {
//                       markAsRead(note._id);
//                       handleNotificationClick(note);
//                     }}
//                   >
//                     <div className="flex items-start">
//                       <div
//                         className={`flex-shrink-0 h-2 w-2 mt-2 rounded-full ${
//                           note.type === "success" ? "bg-green-500" : "bg-red-500"
//                         }`}
//                       />
//                       <div className="ml-3 flex-1">
//                         <p
//                           className={`text-sm ${
//                             note.type === "success"
//                               ? "text-green-700 dark:text-green-400"
//                               : "text-red-700 dark:text-red-400"
//                           }`}
//                         >
//                           {note.message}
//                         </p>
//                         <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                           {new Date(note.createdAt).toLocaleString()}
//                         </p>
//                       </div>
//                       {!note.read && (
//                         <span className="ml-2 flex-shrink-0 inline-block h-2 w-2 rounded-full bg-blue-500" />
//                       )}
//                     </div>
//                   </motion.div>
//                 ))
//               )}
//             </div>

//             {selectedNationalId && (
//               <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-md mt-4">
//                 <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300">National ID</h3>
//                 <p className="text-gray-800 dark:text-gray-200">{selectedNationalId.firstName} {selectedNationalId.middleName} {selectedNationalId.lastName}</p>
//                 <p className="text-gray-800 dark:text-gray-200"></p>
//                 <p className="text-gray-800 dark:text-gray-200"></p>
//                 <p className="text-gray-800 dark:text-gray-200">{selectedNationalId.gender}</p>
//                 <p className="text-gray-800 dark:text-gray-200">{selectedNationalId.nationalidnumber}</p>
//               </div>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default React.memo(Notifications);




// import React, { useState, useEffect, useRef, useCallback } from "react";
// import axios from "axios";
// import { BellIcon, XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";
// import { motion, AnimatePresence } from "framer-motion";

// const Notifications = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [selectedNationalId, setSelectedNationalId] = useState(null);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [isRead, setIsRead] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const dropdownRef = useRef(null);

//   const apiUrl = import.meta.env.VITE_ADMIN_ROUTE;
//   const nationalIdUrl = import.meta.env.VITE_NATIONAL_ID_ROUTE;

//   // Fetch notifications
//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const { data } = await axios.get(`${apiUrl}/notifications`);
//         setNotifications(data);
//         setUnreadCount(data.filter((n) => !n.read).length);
//       } catch (err) {
//         console.error("Fetch error:", err);
//         setError("Failed to load notifications.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNotifications();

//     // Real-time polling (every 30s)
//     const interval = setInterval(fetchNotifications, 30000);
//     return () => clearInterval(interval);
//   }, [apiUrl]);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);



//   const markNotificationAsRead = async (id) => {
//     try {
//       const { data } = await axios.put(`${apiUrl}/notifications/${id}/read`);
    
//       setNotifications((prev) =>
//         prev.map((note) => (note._id === id ? { ...note, ...data.notification } : note))
//       );
//       setUnreadCount((prev) => notifications.filter((note) => !note.isRead).length);
//     } catch (err) {
//       console.error("Error marking notification as read:", err);
//     }
//   };

//   const markAllAsRead = () => {
//     setNotifications((prev) => prev.map((note) => ({ ...note, read: true })));
//     setUnreadCount(0);
//   };

//   // Fetch national ID when a notification is clicked
//   const handleNotificationClick = async (notification) => {
//     try {
//       const { firstName, middleName, lastName, gender } = notification;
//       const response = await axios.get(`${nationalIdUrl}/search/name`, {
//         params: { firstName, middleName, lastName, gender },
//       });
//       setSelectedNationalId(response.data);
//     } catch (err) {
//       console.error("Error fetching national ID:", err);
//       setSelectedNationalId("Error fetching national ID");
//     }
//   };

//   // Delete a notification
//   const handleDeleteNotification = async (id) => {
//     try {
//       await axios.delete(`${apiUrl}/notifications/${id}`);
//       setNotifications((prev) => prev.filter((note) => note._id !== id));
//       setUnreadCount((prev) => prev - 1);
//     } catch (err) {
//       console.error("Error deleting notification:", err);
//     }
//   };

//   return (
//     <div className="relative" ref={dropdownRef}>
//       {/* Notification Trigger */}
//       <motion.button
//         whileTap={{ scale: 0.95 }}
//         onClick={() => setIsOpen(!isOpen)}
//         className="p-2 rounded-full relative hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//         aria-label="Notifications"
//       >
//         <BellIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
//         {unreadCount > 0 && (
//           <motion.span
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
//           >
//             {unreadCount}
//           </motion.span>
//         )}
//       </motion.button>

//       {/* Dropdown */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ type: "spring", damping: 20 }}
//             className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl ring-1 ring-black/10 dark:ring-gray-600 z-50"
//           >
//             <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
//               <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
//                 Notifications {unreadCount > 0 && `(${unreadCount})`}
//               </h2>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={markAllAsRead}
//                   disabled={unreadCount === 0}
//                   className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
//                   aria-label="Mark all as read"
//                 >
//                   <CheckIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
//                 </button>
//                 <button
//                   onClick={() => setIsOpen(false)}
//                   className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
//                   aria-label="Close"
//                 >
//                   <XMarkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
//                 </button>
//               </div>
//             </div>

//             <div className="max-h-96 overflow-y-auto">
//               {loading ? (
//                 [...Array(3)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="p-4 border-b border-gray-100 dark:border-gray-700"
//                   >
//                     <div className="animate-pulse flex space-x-3">
//                       <div className="rounded-full bg-gray-300 dark:bg-gray-600 h-3 w-3 mt-1" />
//                       <div className="flex-1 space-y-2">
//                         <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
//                         <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               ) : notifications.length === 0 ? (
//                 <div className="p-4 text-center text-gray-500 dark:text-gray-400">
//                   No new notifications
//                 </div>
//               ) : (
//                 notifications.map((note) => (
//                   <motion.div
//                     key={note._id}
//                     layout
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-colors ${
//                       !note.read
//                         ? "bg-blue-50 dark:bg-gray-700"
//                         : "hover:bg-gray-50 dark:hover:bg-gray-750"
//                     }`}
//                     onClick={() => {
//                       markNotificationAsRead(note._id);
//                       handleNotificationClick(note);
//                     }}
//                   >
//                     <div className="flex items-start">
//                       <div
//                         className={`flex-shrink-0 h-2 w-2 mt-2 rounded-full ${
//                           note.type === "success"
//                             ? "bg-green-500"
//                             : "bg-red-500"
//                         }`}
//                       />
//                       <div className="ml-3 flex-1">
//                         <p
//                           className={`text-sm ${
//                             note.type === "success"
//                               ? "text-green-700 dark:text-green-400"
//                               : "text-red-700 dark:text-red-400"
//                           }`}
//                         >
//                           {note.message}
//                         </p>
//                         <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                           {new Date(note.createdAt).toLocaleString()}
//                         </p>
//                       </div>
//                       {!note.read && !isRead && (
//                         <span className="ml-2 flex-shrink-0 inline-block h-2 w-2 rounded-full bg-blue-500" />
//                       )}
//                       <div className="ml-2 flex-shrink-0">
//                         {/* Delete Button */}
//                         <button
//                           onClick={() => handleDeleteNotification(note._id)}
//                           className="p-1 rounded-md hover:bg-red-100 dark:hover:bg-red-700"
//                           aria-label="Delete notification"
//                         >
//                           <XMarkIcon className="h-5 w-5 text-red-500 dark:text-red-400" />
//                         </button>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))
//               )}
//             </div>

//             {selectedNationalId && (
//               <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-md mt-4">
//                 <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300">
//                   National ID
//                 </h3>
//                 <p className="text-gray-800 dark:text-gray-200">
//                   {selectedNationalId.firstName} {selectedNationalId.middleName}{" "}
//                   {selectedNationalId.lastName}
//                 </p>
//                 <p className="text-gray-800 dark:text-gray-200">
//                   {selectedNationalId.gender}
//                 </p>
//                 <p className="text-gray-800 dark:text-gray-200">
//                   {selectedNationalId.nationalidnumber}
//                 </p>
//               </div>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default React.memo(Notifications);















import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { BellIcon, XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNationalId, setSelectedNationalId] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);

  const apiUrl = import.meta.env.VITE_ADMIN_ROUTE;
  const nationalIdUrl = import.meta.env.VITE_NATIONAL_ID_ROUTE;

  // Fetch notifications
  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${apiUrl}/notifications`);
      setNotifications(data);
      setUnreadCount(data.filter((n) => !n.isRead).length);
      setError(null);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load notifications. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    const unread = notifications.filter((note) => !note.isRead).length;
    setUnreadCount(unread);
  }, [notifications]);

  useEffect(() => {
    fetchNotifications();

    // Real-time polling (every 30s)
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markNotificationAsRead = async (id) => {
    try {
      const { data } = await axios.put(`${apiUrl}/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((note) => (note._id === id ? { ...note, isRead: true } : note))
      );
      setUnreadCount((prev) => prev - 1);
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const markAllAsRead = useCallback(async () => {
    try {
      await axios.put(`${apiUrl}/notifications/mark-all-read`);
      setNotifications((prev) => prev.map((note) => ({ ...note, isRead: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error("Error marking all as read:", err);
      setError("Failed to mark all notifications as read.");
    }
  }, [apiUrl]);

  // Fetch national ID when a notification is clicked
  const handleNotificationClick = useCallback(async (notification) => {
    try {
      const { firstName, middleName, lastName, gender } = notification;
      const response = await axios.get(`${nationalIdUrl}/search/name`, {
        params: { firstName, middleName, lastName, gender },
      });
      setSelectedNationalId(response.data);
    } catch (err) {
      console.error("Error fetching national ID:", err);
      setSelectedNationalId(null);
      setError("Failed to fetch national ID details.");
    }
  }, [nationalIdUrl]);

  // Delete a notification
  const handleDeleteNotification = useCallback(async (id) => {
    try {
      await axios.delete(`${apiUrl}/notifications/${id}`);
      setNotifications((prev) => prev.filter((note) => note._id !== id));
      setUnreadCount((prev) => prev - 1);
    } catch (err) {
      console.error("Error deleting notification:", err);
      setError("Failed to delete notification.");
    }
  }, [apiUrl]);

  const handleNotificationItemClick = useCallback((note) => {
    markNotificationAsRead(note._id);
    handleNotificationClick(note);
  }, [markNotificationAsRead, handleNotificationClick]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Trigger */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full relative hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Notifications"
      >
        <BellIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
          >
            {unreadCount}
          </motion.span>
        )}
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", damping: 20 }}
            className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl ring-1 ring-black/10 dark:ring-gray-600 z-50"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Notifications {unreadCount > 0 && `(${unreadCount})`}
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                  className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
                  aria-label="Mark all as read"
                >
                  <CheckIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                  aria-label="Close"
                >
                  <XMarkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {error && (
                <div className="p-4 text-center text-red-500 dark:text-red-400">
                  {error}
                  <button 
                    onClick={fetchNotifications} 
                    className="ml-2 text-blue-500 hover:underline"
                  >
                    Retry
                  </button>
                </div>
              )}

              {loading ? (
                [...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="p-4 border-b border-gray-100 dark:border-gray-700"
                  >
                    <div className="animate-pulse flex space-x-3">
                      <div className="rounded-full bg-gray-300 dark:bg-gray-600 h-3 w-3 mt-1" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                      </div>
                    </div>
                  </div>
                ))
              ) : notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No new notifications
                </div>
              ) : (
                notifications.map((note) => (
                  <motion.div
                    key={note._id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-colors ${
                      !note.read
                        ? "bg-blue-50 dark:bg-gray-700"
                        : "hover:bg-gray-50 dark:hover:bg-gray-750"
                    }`}
                    onClick={() => handleNotificationItemClick(note)}
                  >
                    <div className="flex items-start">
                      <div
                        className={`flex-shrink-0 h-2 w-2 mt-2 rounded-full ${
                          note.type === "success"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      />
                      <div className="ml-3 flex-1">
                        <p
                          className={`text-sm ${
                            note.type === "success"
                              ? "text-green-700 dark:text-green-400"
                              : "text-red-700 dark:text-red-400"
                          }`}
                        >
                          {note.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {new Date(note.createdAt).toLocaleString()}
                        </p>
                      </div>
                      {!note.read && (
                        <span className="ml-2 flex-shrink-0 inline-block h-2 w-2 rounded-full bg-blue-500" />
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteNotification(note._id);
                        }}
                        className="ml-2 flex-shrink-0 p-1 rounded-md hover:bg-red-100 dark:hover:bg-red-700"
                        aria-label="Delete notification"
                      >
                        <XMarkIcon className="h-5 w-5 text-red-500 dark:text-red-400" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {selectedNationalId && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-md m-4 border border-blue-100 dark:border-blue-800">
                <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300 mb-2">
                  National ID Details
                </h3>
                <div className="space-y-1">
                  <p className="text-gray-800 dark:text-gray-200">
                    <span className="font-semibold">Name:</span> {selectedNationalId.firstName} {selectedNationalId.middleName}{" "}
                    {selectedNationalId.lastName}
                  </p>
                  <p className="text-gray-800 dark:text-gray-200">
                    <span className="font-semibold">Gender:</span> {selectedNationalId.gender}
                  </p>
                  <p className="text-gray-800 dark:text-gray-200">
                    <span className="font-semibold">ID Number:</span> {selectedNationalId.nationalidnumber}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default React.memo(Notifications);