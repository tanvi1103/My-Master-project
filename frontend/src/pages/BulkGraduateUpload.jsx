import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaFileExcel } from "react-icons/fa";

const BulkGraduateUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(100); // Start at 100%
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setErrorMessage(""); // Clear error when a file is selected
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    setUploadStatus("");
    setErrorMessage(""); // Reset previous errors

    if (!file) {
      setErrorMessage("Please select a file to upload.");
      return;
    }

    // Validate file type and size
    if (!file.name || !file.name.match(/\.(xlsx|xls)$/i)) { // Case-insensitive match
      setErrorMessage("Invalid file type. Please upload an Excel file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setErrorMessage(`File size exceeds the 5MB limit. Your file is ${(file.size / (1024 * 1024)).toFixed(2)}MB.`);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setErrorMessage("Unauthorized: No token found.");
        setShowProgress(true); // Show progress indicator
        let progressValue = 100; // Start at 100%
        const interval = setInterval(() => {
          progressValue -= 5; // Decrease progress by 5% every 100ms
          setProgress(progressValue);

          if (progressValue <= 0) {
            clearInterval(interval);
            setProgress(100); // Reset progress to 100%
            setShowProgress(false);
            navigate("/admin/login");
          }
        }, 100); // Update every 100ms
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
        }
      );

      if (response.status === 200) {
        setUploadStatus("File uploaded successfully.");
        setFile(null); // Reset the file input
        setTimeout(() => setUploadStatus(""), 3000); // Clear success message after 3 seconds
      } else {
        setErrorMessage("Failed to upload file. Please try again.");
      }
    } catch (error) {
      const { status } = error.response || {};
      if (status === 401) {
        setErrorMessage("Unauthorized. Redirecting to login...");
        setShowProgress(true); // Show progress indicator
      
        let progressValue = 100; // Start at 100%
        const interval = setInterval(() => {
          progressValue -= 5; // Decrease progress by 5% every 100ms
          setProgress(progressValue);
      
          if (progressValue <= 0) {
            clearInterval(interval); // Stop the interval when progress reaches 0
            setProgress(100); // Reset progress to 100%
            setShowProgress(false); // Hide progress indicator
            navigate("/admin/login"); // Redirect to login page
          }
        }, 100); // Update every 100ms
      } else if (status === 403) {
        setErrorMessage("Forbidden.");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

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
        {errorMessage && (
          <p className="text-red-500 mt-2" aria-live="assertive">{errorMessage}</p>
        )}
        {showProgress && (
          <div className="w-full bg-gray-300 rounded-full h-4 mt-4 mb-5" aria-live="polite">
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