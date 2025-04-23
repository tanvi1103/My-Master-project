import React, { useState, useEffect, useRef } from "react";
import AdminSidebar from "../pages/AdminSidebar";
import ThemeToogler from "../pages/ThemeToogler";
import { Menu } from "lucide-react";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef();

  // Close sidebar when clicking outside
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  // ...existing code...
  return (
    <div className="min-h-screen bg-gary-100 dark:bg-gray-900 flex flex-col md:flex-row">
      {/* Navbar - fixed at the top */}
      <nav className="fixed top-0 left-0 w-full z-30 flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 border-b shadow-sm">
        <div className="flex items-center gap-4">
          <span className="font-bold text-xl">Admin Panel</span>
          <a
            href="/admin/dashboard"
            className="text-gray-700 dark:text-gray-200 hover:underline px-2"
          >
            Dashboard
          </a>
          <a
            href="/admin/users"
            className="text-gray-700 dark:text-gray-200 hover:underline px-2"
          >
            Users
          </a>
          <a
            href="/admin/settings"
            className="text-gray-700 dark:text-gray-200 hover:underline px-2"
          >
            Settings
          </a>
        </div>
        <ThemeToogler />
      </nav>
      {/* Mobile toggle button and theme toggle - fixed under navbar */}
      <div className="md:hidden fixed top-16 left-0 w-full z-20 flex justify-between items-center px-4 py-2 border-b bg-white dark:bg-gray-900">
        <div className="flex items-center gap-2">
          <button
            className="text-gray-800 dark:text-gray-100 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <span className="font-bold text-lg">Admin Panel</span>
        </div>
        <ThemeToogler />
      </div>
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed md:relative z-20 top-0 left-0 min-h-screen w-64 bg-white dark:bg-gray-900 shadow-md transform transition-transform duration-300 ease-in-out
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        style={{ marginTop: "84px" }} // Adjust for navbar height
      >
        <AdminSidebar />
      </div>
      {/* Main content */}
      <main className="flex-1 ml-0  p-4 " style={{ marginTop: "64px" }}>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
