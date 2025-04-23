import React from 'react'
import { FaCloudUploadAlt, FaGraduationCap, FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const AdminSidebar = () => {
  return (
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-md p-4 space-y-4">
    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Admin Dashboard</h2>
    <nav className="flex flex-col gap-3">
      <Link
        to="/admin/view-graduates"
        className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white"
      >
        <FaGraduationCap /> View & Update Graduates
      </Link>
      <Link
        to="/admin/add-graduate"
        className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white"
      >
        <FaPlus /> Add Graduate (Single)
      </Link>
      <Link
        to="/admin/upload-excel"
        className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white"
      >
        <FaCloudUploadAlt /> Upload Excel (.xlsx)
      </Link>
    </nav>
  </aside>

  )
}

export default AdminSidebar
