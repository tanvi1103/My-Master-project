import React from "react";
import { FaCloudUploadAlt, FaGraduationCap, FaPlus } from "react-icons/fa";
import { MdPersonAddAlt } from 'react-icons/md';
// <MdPersonAddAlt />

import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="w-full md:w-64 p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
      <nav className="flex flex-col gap-4">
        <Link
          to="/admin/view-graduates"
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white transition"
        >
          <FaGraduationCap /> View & Update Graduates
        </Link>
        <Link
          to="/admin/add-graduate"
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white transition"
        >
          <FaPlus /> Add Graduate 
        </Link>
        <Link
          to="/admin/add-graduate/single"
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white transition"
        >
          <FaPlus /> Add Graduate (Single)
        </Link>
        <Link
          to="/admin/add-graduate/file"
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white transition"
        >
          <FaCloudUploadAlt /> Upload Excel (.xlsx)
        </Link>

        <Link
          to="/admin/addingUser"
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white transition"
        >
          <MdPersonAddAlt  />Create New User
        </Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
