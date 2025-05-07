import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { BellIcon, XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_ADMIN_ROUTE}/notifications`);
        setNotifications(data);
        setUnreadCount(data.filter(n => !n.read).length);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();

    // Real-time polling (every 30s)
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

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

  const markAsRead = useCallback((id) => {
    setNotifications(prev => 
      prev.map(note => 
        note._id === id ? { ...note, read: true } : note
      )
    );
    setUnreadCount(prev => prev - 1);
  }, []);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(note => ({ ...note, read: true })));
    setUnreadCount(0);
  };

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
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <div key={i} className="p-4 border-b border-gray-100 dark:border-gray-700">
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
                      !note.read ? "bg-blue-50 dark:bg-gray-700" : "hover:bg-gray-50 dark:hover:bg-gray-750"
                    }`}
                    onClick={() => markAsRead(note._id)}
                  >
                    <div className="flex items-start">
                      <div
                        className={`flex-shrink-0 h-2 w-2 mt-2 rounded-full ${
                          note.type === "success" ? "bg-green-500" : "bg-red-500"
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
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default React.memo(Notifications);