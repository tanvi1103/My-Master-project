// components/BulkGraduateUpload.jsx
import React, { useState } from "react";
import axios from "axios";
import { FaFileExcel } from "react-icons/fa";

const BulkGraduateUpload = ({file, setFile, uploadStatus, setUploadStatus, handleFileChange, handleFileUpload, errorMessage, setErrorMessage}) => {
  
  return (
    <>
    <h2 className="text-2xl font-bold mb-4">Upload Graduates (Bulk File)</h2>
    <form onSubmit={handleFileUpload} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
      <input type="file" accept=".xlsx, .xls" className="w-full p-2 rounded border dark:bg-gray-700" onChange={handleFileChange} />
      <button type="submit" className="mt-4 w-full px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2 justify-center">
        <FaFileExcel /> Upload
      </button>
      {uploadStatus && !errorMessage && <p className="text-green-500 mt-2">{uploadStatus}</p>}
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </form>
  </>
  );
};

export default BulkGraduateUpload;
