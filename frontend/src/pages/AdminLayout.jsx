import React, { useState, useEffect, useRef } from "react";
import AdminSidebar from "./AdminSidebar";
import ThemeToogler from "./ThemeToogler";
import { Menu } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef();
  const navigate = useNavigate();

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
      await axios.get("http://localhost:5000/api/admin/logout", { withCredentials: true });
      Swal.fire("Success", "🎉 Admin Logout Successful!", "success");
      navigate("/admin/login");
    } catch (error) {
      Swal.fire("Error", "❌ Admin Logout Failed", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col md:flex-row">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-30 flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 shadow-md">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-gray-800 dark:text-white"
          >
            <Menu size={24} />
          </button>
          <span className="font-bold text-lg text-gray-900 dark:text-white">BUGCVS</span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToogler />
          <button
            onClick={handleAdminLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-16 md:top-0 left-0 z-20 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <AdminSidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 md:ml-64 overflow-auto p-6 md:p-8 mt-16 max-w-7xl mx-auto">
  {children}
</main>
    </div>
  );
};

export default AdminLayout;
