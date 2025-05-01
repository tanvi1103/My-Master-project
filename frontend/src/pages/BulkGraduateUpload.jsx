// components/BulkGraduateUpload.jsx
import React, { useState } from "react";
import axios from "axios";
import { FaFileExcel } from "react-icons/fa";

const BulkGraduateUpload = ({
  file,
  setFile,
  uploadStatus,
  setUploadStatus,
  handleFileChange,
  handleFileUpload,
  errorMessage,
  setErrorMessage,
  showProgress,
  setShowProgress,
  progress,
  setProgress,
}) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Upload Graduates (Bulk File)</h2>
      <form
        onSubmit={handleFileUpload}
        className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg"
      >
        <input
          type="file"
          accept=".xlsx, .xls"
          className="w-full p-2 rounded border dark:bg-gray-700"
          onChange={handleFileChange}
        />
        <button
          type="submit"
          className="mt-4 w-full px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2 justify-center"
        >
          <FaFileExcel /> Upload
        </button>
        {uploadStatus && !errorMessage && (
          <p className="text-green-500 mt-2">{uploadStatus}</p>
        )}
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        {showProgress && (
          <div className="w-full bg-gray-300 rounded-full h-4 mt-4 mb-5">
            <div
              className="bg-green-500 h-4 rounded-full"
              style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
            ></div>
            <p className="text-center text-red-500 mt-2">Redirecting to login page</p>
          </div>
        )}
      </form>
    </>
  );
};

export default BulkGraduateUpload;
