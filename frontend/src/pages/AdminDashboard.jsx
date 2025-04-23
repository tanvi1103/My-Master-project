import React from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaPlus, FaCloudUploadAlt } from 'react-icons/fa';
import AdminSidebar from './AdminSidebar';

const AdminDashboard = () => {
  return (
    <div className="flex rounded-xl  bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      {/* <AdminSidebar /> */}
   


      {/* Main content */}
      <main className="flex-1 p-6 text-gray-900 dark:text-white">
        <h1 className="text-3xl font-semibold mb-4">Welcome, Admin</h1>
        <p className="text-gray-700 dark:text-gray-300">
          Use the sidebar to manage graduates and perform actions like viewing, updating, or adding graduate data.
        </p>
      </main>
    </div>
  );
};

export default AdminDashboard;