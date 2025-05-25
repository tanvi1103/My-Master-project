import React from "react";
import { 
  FaTachometerAlt, 
  FaUserGraduate, 
  FaUserPlus, 
  FaUsersCog,
  FaFileExcel,
  FaUserShield,
  FaPlusCircle,
  FaUserEdit
} from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";
import { Link } from "react-router-dom";

/**
 * AdminSidebar - Navigation sidebar for admin dashboard
 * @returns {JSX.Element} React component
 */
const AdminSidebar = () => {
  return (
    <aside className="w-full md:w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Admin Dashboard
      </h2>
      
      <nav className="flex flex-col gap-2">
        {/* Dashboard Link */}
        <Link
          to="/admin"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors duration-200"
        >
          <FaTachometerAlt className="text-blue-500 dark:text-blue-400" />
          <span className="font-medium">Dashboard</span>
        </Link>

        {/* Graduates Section */}
        <div className="mt-2">
          <p className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Graduates Management
          </p>
          
          <Link
            to="/admin/view-graduates"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors duration-200"
          >
            <FaUserGraduate className="text-green-500 dark:text-green-400" />
            <span className="font-medium">View Graduates</span>
          </Link>
          
          <Link
            to="/admin/add-graduate"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors duration-200"
          >
            <FaPlusCircle className="text-purple-500 dark:text-purple-400" />
            <span className="font-medium">Add Graduate</span>
          </Link>
          
          <Link
            to="/admin/add-graduate/single"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors duration-200"
          >
            <FaUserPlus className="text-indigo-500 dark:text-indigo-400" />
            <span className="font-medium">Add Single Graduate</span>
          </Link>
          
          <Link
            to="/admin/add-graduate/file"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors duration-200"
          >
            <FiUploadCloud className="text-yellow-500 dark:text-yellow-400" />
            <span className="font-medium">Upload Excel File</span>
          </Link>
        </div>

        {/* User Management Section */}
        <div className="mt-2">
          <p className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            User Management
          </p>
          
          <Link
            to="/admin/addingUser"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors duration-200"
          >
            <FaUserPlus className="text-blue-500 dark:text-blue-400" />
            <span className="font-medium">Create New User</span>
          </Link>
          
          <Link
            to="/admin/usermanagement"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors duration-200"
          >
            <FaUsersCog className="text-red-500 dark:text-red-400" />
            <span className="font-medium">Manage Accounts</span>
          </Link>
          
          <Link
            to="/admin/ExternalUserManagement"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors duration-200"
          >
            <FaUserShield className="text-orange-500 dark:text-orange-400" />
            <span className="font-medium">External Users</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;