import React, { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_ADMIN_ROUTE

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${apiUrl}/notifications`)
      .then((res) => {
        setNotifications(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching notifications", err);
        setError("Failed to load notifications. Please try again later.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Notifications</h2>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {loading ? (
          <p className="text-gray-500 dark:text-gray-400">Loading notifications...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : notifications.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No notifications found.</p>
        ) : (
          notifications.map((note) => (
            <div
              key={note._id}
              className={`p-4 rounded-md border-l-4 ${
                note.type === "success"
                  ? "bg-green-50 border-green-600 text-green-700"
                  : "bg-red-50 border-red-600 text-red-700"
              }`}
            >
              <p>{note.message}</p>
              <small className="block text-xs text-gray-400">
                {new Date(note.createdAt).toLocaleString()}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;