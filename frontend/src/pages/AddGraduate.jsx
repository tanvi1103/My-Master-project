import axios from "axios";
import React, { useState } from "react";
import { FaFileExcel } from "react-icons/fa";

const AddGraduate = () => {
  const [graduate, setGraduate] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    cgpa: "",
    gender: "",
    department: "",
    college: "",
    program: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGraduate({ ...graduate, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cgpaVal = parseFloat(graduate.cgpa);
    if (cgpaVal < 1.75 || cgpaVal > 4.0) {
      alert("CGPA must be between 1.75 and 4.00");
      return;
    }
    console.log("Submitted Graduate:", graduate);
  };

  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Function to handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Function to handle file upload
  const handleFileUpload = async (e) => {
    e.preventDefault();
    setUploadStatus("");
    setErrorMessage("");

    if (!file) {
      return  setUploadStatus("Please select a file to upload.");
    }

    const formData = new FormData();
    formData.append("file", file); // This should match the field name expected by multer

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setUploadStatus("Unauthorized: No token found. Please log in again.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/upload", // Ensure this matches your backend route
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
      } else {
        setErrorMessage("Failed to upload file. Please try again.");
      }
    } catch (error) {
      console.error(
        "Upload error:",
        error.response ? error.response.data : error.message
      );

      if (error.response && error.response.status === 401) {
        setErrorMessage("Unauthorized: Please login again.");
      } else if (error.response && error.response.status === 403) {
        setErrorMessage(
          "Forbidden: You do not have permission to upload this file."
        );
      } else if (error.response && error.response.status === 400) {
        setErrorMessage("Bad Request: The file might be invalid.");
      } else {
        setErrorMessage("Error uploading file. Please try again.");
      }
    }
  };
  // flex min-h-screen bg-gray-100 dark:bg-gray-900
  return (
    <div className="p-6 min-h-screen b max-w-4xl mx-auto bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Add Graduate (Single)</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  md:grid-cols-2 gap-4 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg"
      >
        <input
          name="firstName"
          placeholder="First Name"
          className="p-2 rounded border dark:bg-gray-700"
          value={graduate.firstName}
          onChange={handleChange}
        />
        <input
          name="middleName"
          placeholder="Middle Name"
          className="p-2 rounded border dark:bg-gray-700"
          value={graduate.middleName}
          onChange={handleChange}
        />
        <input
          name="lastName"
          placeholder="Last Name"
          className="p-2 rounded border dark:bg-gray-700"
          value={graduate.lastName}
          onChange={handleChange}
        />
        <input
          name="cgpa"
          placeholder="CGPA"
          type="number"
          step="0.01"
          className="p-2 rounded border dark:bg-gray-700"
          value={graduate.cgpa}
          onChange={handleChange}
        />
        <input
          name="department"
          placeholder="Department"
          className="p-2 rounded border dark:bg-gray-700"
          value={graduate.department}
          onChange={handleChange}
        />
        <input
          name="college"
          placeholder="College"
          className="p-2 rounded border dark:bg-gray-700"
          value={graduate.college}
          onChange={handleChange}
        />
        <input
          name="program"
          placeholder="Graduate Program"
          className="p-2 rounded border dark:bg-gray-700"
          value={graduate.program}
          onChange={handleChange}
        />
        <select
          name="gender"
          className="p-2 rounded border dark:bg-gray-700"
          value={graduate.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <div className="md:col-span-2 flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>

      <hr className="my-8" />

      <h2 className="text-2xl font-bold mb-4">Upload Graduates (.xlsx)</h2>
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
          className="mt-4 w-full px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {" "}
          <FaFileExcel /> Upload
        </button>
        {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default AddGraduate;
