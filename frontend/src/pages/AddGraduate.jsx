import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaFileExcel } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BulkGraduateUpload from "./BulkGraduateUpload";
import SingleGraduateForm from "./SingleGraduateForm";

const collegeDepartmentData = {
  "Engineering and Technology": [
    "Computer Science",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Civil Engineering",
  ],
  "Business and Economics": [
    "Accounting and Finance",
    "Banking and Finance",
    "Economics",
    "Marketing Management",
    "Management",
    "Public Administration",
    "Hotel and Tourism Management",
  ],
  "Health Science": ["Nursing", "Pharmacy", "Public Health", "Midwifery"],
  "Social Science": [
    "English Language and Literature",
    "History and Heritage management",
    "Geography and Environmental studies",
    "Curriculum and Instruction",
    "Psychology",
    "Special Needs and Inclusive Education",
    "Law",
    "Sociology",
    "Civics and Ethical Studies",
    "Political Science and International Relations",
  ],
  "Natural and Computational Science": [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Statistics",
    "Geology",
    "Sports Science",
  ],
  "Agriculture and Natural Resource": [
    "Animal Science",
    "Agro economics",
    "Natural Resource Management",
    "soil and water conservation",
    "Horticulture",
    "Plant Science",
    "Forestry",
    "Veterinary Medicine",
    "Coffee Science and Technology",
  ],
};

const initialGraduateState = {
  firstName: "",
  middleName: "",
  lastName: "",
  cgpa: "",
  gender: "",
  department: "",
  college: "",
  program: "",
  gstatus: "",
  startDate: "",
  endDate: "",
};

const nameRegex = /^[A-Za-z\s-]+$/;

const AddGraduate = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("single"); // 'single' or 'file'
  const [graduate, setGraduate] = useState(initialGraduateState);
  const [formValid, setFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(100); // Start at 100%

  const validateForm = (grad) => {
    if (!grad.firstName.trim()) return "First name is required";
    if (!nameRegex.test(grad.firstName))
      return "First name can only contain letters, spaces, or hyphens";
    if (!grad.middleName.trim()) return "Middle name is required";
    if (!nameRegex.test(grad.middleName))
      return "Middle name can only contain letters, spaces, or hyphens";
    if (!grad.lastName.trim()) return "Last name is required";
    if (!nameRegex.test(grad.lastName))
      return "Last name can only contain letters, spaces, or hyphens";
    if (!grad.program.trim()) return "Program is required";
    if (!grad.gstatus) return "Graduate status is required";
    if (!grad.startDate || !grad.endDate)
      return "Start and end dates are required";
    if (grad.endDate < grad.startDate)
      return "End date must be after start date";
    if (!grad.college) return "College is required";
    if (!grad.department) return "Department is required";
    if (!grad.gender) return "Gender is required";
    if (!grad.cgpa) return "CGPA is required";

    const cgpaVal = parseFloat(grad.cgpa);
    if (isNaN(cgpaVal) || cgpaVal < 1.75 || cgpaVal > 4.0)
      return "CGPA must be between 1.75 and 4.00";
    return "";
  };

  useEffect(() => {
    if (mode === "single") {
      const result = validateForm(graduate);
      setErrorMessage(result);
      setFormValid(!result);
    } else {
      setErrorMessage(""); // Clear error message in "file upload" mode
      setFormValid(true); // Enable the submit button for file upload
    }
  }, [graduate, mode]);

  const handleGraduateChange = (e) => {
    const { name, value } = e.target;
    if (name === "college") {
      setGraduate({ ...graduate, college: value, department: "" });
    } else if (name === "cgpa") {
      const num = parseFloat(value);
      if (value === "" || (num >= 1.75 && num <= 4.0)) {
        setGraduate({ ...graduate, [name]: value });
      }
    } else {
      setGraduate({ ...graduate, [name]: value });
    }
  };

  const handleGraduateSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message before validation
    if (!formValid) return;
    alert("Graduate added successfully!");
    setGraduate(initialGraduateState);
  };

  const departmentOptions = graduate.college
    ? collegeDepartmentData[graduate.college] || []
    : [];

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

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setErrorMessage("Unauthorized: No token found.");
        setShowProgress(true); // Show progress indicator
        let progressValue = 100; // Start at 100%
        const interval = setInterval(() => {
          progressValue -= 2; // Decrease progress by 5% every 100ms
          setProgress(progressValue);

          if (progressValue <= 0) {
            clearInterval(interval); // Stop the interval when progress reaches 0
            setShowProgress(false); // Hide progress indicator
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
          progressValue -= 2; // Decrease progress by 5% every 100ms
          setProgress(progressValue);
      
          if (progressValue <= 0) {
            clearInterval(interval); // Stop the interval when progress reaches 0
            setShowProgress(false); // Hide progress indicator
            navigate("/admin/login"); // Redirect to login page
          }
        }, 100); // Update every 100ms
      } else if (status === 403) {
        setErrorMessage("Forbidden.");
      } else {
        setErrorMessage("Upload failed. Please try again.");
      }
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <div className="flex justify-center mb-6 space-x-4">
        <button
          onClick={() => setMode("single")}
          className={`px-4 py-2 rounded ${
            mode === "single"
              ? "bg-blue-600 text-white"
              : "bg-gray-300 dark:bg-gray-700"
          }`}
        >
          Single Upload
        </button>
        <button
          onClick={() => setMode("file")}
          className={`px-4 py-2 rounded ${
            mode === "file"
              ? "bg-green-600 text-white"
              : "bg-gray-300 dark:bg-gray-700"
          }`}
        >
          Bulk Upload (Excel)
        </button>
      </div>

      {mode === "single" && (
        <SingleGraduateForm
          validateForm={validateForm}
          handleGraduateChange={handleGraduateChange}
          handleGraduateSubmit={handleGraduateSubmit}
          departmentOptions={departmentOptions}
          graduate={graduate}
          errorMessage={errorMessage}
          formValid={formValid}
          setGraduate={setGraduate}
          setErrorMessage={setErrorMessage}
          setFormValid={setFormValid}
          collegeDepartmentData={collegeDepartmentData}
          initialGraduateState={initialGraduateState}
          nameRegex={nameRegex}
        />
      )}

      {mode === "file" && (
        <BulkGraduateUpload
          file={file}
          setFile={setFile}
          uploadStatus={uploadStatus}
          setUploadStatus={setUploadStatus}
          handleFileChange={handleFileChange}
          handleFileUpload={handleFileUpload}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          showProgress={showProgress}
          setShowProgress={setShowProgress}
          progress={progress} // Pass the progress state to the component
          setProgress={setProgress} // Pass the setProgress function to the component
        />
      )}
    </div>
  );
};

export default AddGraduate;
