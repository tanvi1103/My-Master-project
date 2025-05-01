import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaFileExcel, FaUpload } from "react-icons/fa";
import Swal from "sweetalert2";


const BulkGraduateUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(100);
  const [errorMessage, setErrorMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setErrorMessage("");
    setUploadStatus("");
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setUploadStatus("");
    setErrorMessage("");

    if (!file) {
      setErrorMessage("Please select a file to upload.");
      setIsUploading(false);
      return;
    }

    // File validation
    if (!file.name.match(/\.(xlsx|xls)$/i)) {
      setErrorMessage("Invalid file type. Please upload an Excel file.");
      setIsUploading(false);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage(`File size exceeds 5MB limit (${(file.size / (1024 * 1024)).toFixed(2)}MB)`);
      setIsUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        handleUnauthorized();
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "File uploaded successfully",
          icon: "success",
          confirmButtonColor: "#10b981",
          timer: 3000,
          timerProgressBar: true,
        });
        setFile(null);
        document.getElementById("file-upload").value = ""; // Reset file input
      }
    } catch (error) {
      handleUploadError(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUnauthorized = () => {
    setErrorMessage("Session expired. Redirecting to login...");
    setShowProgress(true);
    
    let progressValue = 100;
    const interval = setInterval(() => {
      progressValue -= 2;
      setProgress(progressValue);

      if (progressValue <= 0) {
        clearInterval(interval);
        navigate("/admin/login");
      }
    }, 50);
  };

  const handleUploadError = (error) => {
    if (error.response?.status === 401) {
      handleUnauthorized();
    } else if (error.response?.status === 403) {
      setErrorMessage("You don't have permission to upload files");
    } else {
      setErrorMessage(
        error.response?.data?.message || 
        "Failed to upload file. Please check your network connection."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center justify-center gap-3">
              <FaFileExcel className="text-xl sm:text-2xl" />
              Bulk Graduate Upload
            </h2>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8">
            <form onSubmit={handleFileUpload} className="space-y-6">
              {/* File Upload Area */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Excel File (.xlsx, .xls)
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer 
                    border-gray-300 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-500 transition-colors duration-200
                    bg-gray-50 dark:bg-gray-700"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FaUpload className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Excel files only (MAX: 5MB)
                      </p>
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      accept=".xlsx, .xls"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                {file && (
                  <div className="mt-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                    <p className="text-sm text-green-700 dark:text-green-400 flex items-center gap-2">
                      <FaFileExcel />
                      {file.name} ({(file.size / 1024).toFixed(2)} KB)
                    </p>
                  </div>
                )}
              </div>

              {/* Upload Button */}
              <button
                type="submit"
                disabled={!file || isUploading}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-white shadow-md transition-all duration-300 flex items-center justify-center gap-2
                ${!file || isUploading 
                  ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700 hover:scale-[1.02]'
                }`}
              >
                {isUploading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </>
                ) : (
                  <>
                    <FaUpload /> Upload File
                  </>
                )}
              </button>

              {/* Status Messages */}
              {errorMessage && (
                <div className="animate-shake p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400 text-sm font-medium">
                  ⚠️ {errorMessage}
                </div>
              )}

              {uploadStatus && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400 text-sm font-medium">
                  ✓ {uploadStatus}
                </div>
              )}

              {/* Progress Bar (for redirect) */}
              {showProgress && (
                <div className="space-y-2">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-green-500 h-2.5 rounded-full"
                      style={{ width: `${progress}%`, transition: "width 0.05s linear" }}
                    ></div>
                  </div>
                  <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                    Redirecting to login... {progress}%
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            📋 Upload Instructions
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 list-disc pl-5">
            <li>Only Excel files (.xlsx, .xls) are accepted</li>
            <li>Maximum file size: 5MB</li>
            <li>Ensure your file follows the required format</li>
            <li>Required columns: First Name, Last Name, CGPA, etc.</li>
          </ul>
        </div>
      </div>

      {/* Add to your CSS */}
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default BulkGraduateUpload;