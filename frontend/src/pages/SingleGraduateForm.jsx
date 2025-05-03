import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; // Added for navigation

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

const initialStudentState = {
  certificateID: "",
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

const AddStudentCredentials = () => {
  const [student, setStudent] = useState(initialStudentState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const certificateIdRef = useRef(null);
  const navigate = useNavigate(); // Initialize navigate

  // Auto-focus first input on mount
  useEffect(() => {
    certificateIdRef.current?.focus();
  }, []);

  const isFormComplete = () => {
    return (
      student.certificateID.trim() && /^[A-Za-z]{2}\d{4}$/i.test(student.certificateID) &&
      student.firstName.trim() &&
      student.middleName.trim() &&
      student.lastName.trim() &&
      student.college &&
      student.department &&
      student.gender &&
      student.program &&
      student.gstatus &&
      student.cgpa && parseFloat(student.cgpa) >= 1.75 && parseFloat(student.cgpa) <= 4.0 &&
      student.startDate &&
      student.endDate && new Date(student.endDate) >= new Date(student.startDate)
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "college") {
      setStudent(prev => ({ ...prev, college: value, department: "" }));
    } else {
      setStudent(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!student.certificateID.trim()) {
      newErrors.certificateID = "Certificate ID is required";
    } else if (!/^[A-Za-z]{2}\d{4}$/i.test(student.certificateID)) {
      newErrors.certificateID = "Format: 2 letters followed by 4 numbers (e.g., AB1234)";
    }

    if (!student.firstName.trim()) newErrors.firstName = "First name is required";
    if (!student.middleName.trim()) newErrors.middleName = "Middle name is required";
    if (!student.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!student.college) newErrors.college = "College is required";
    if (!student.department) newErrors.department = "Department is required";
    if (!student.gender) newErrors.gender = "Gender is required";
    if (!student.program) newErrors.program = "Program is required";
    if (!student.gstatus) newErrors.gstatus = "Status is required";
    
    if (!student.cgpa) {
      newErrors.cgpa = "CGPA is required";
    } else {
      const cgpaNum = parseFloat(student.cgpa);
      if (isNaN(cgpaNum) || cgpaNum < 1.75 || cgpaNum > 4.0) {
        newErrors.cgpa = "Must be between 1.75 and 4.00";
      }
    }

    if (!student.startDate) newErrors.startDate = "Start date is required";
    if (!student.endDate) newErrors.endDate = "End date is required";
    else if (new Date(student.endDate) < new Date(student.startDate)) {
      newErrors.endDate = "End date must be after start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (isSubmitting) return; // Prevent duplicate submissions
  
    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fix all errors before submitting",
        confirmButtonColor: "#3b82f6",
      });
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Authentication Error",
          text: "You are not authenticated. Please log in.",
          confirmButtonColor: "#3b82f6",
        });
        navigate("/admin/login"); // Redirect to login page
        return;
      }
  
      await axios.post(`http://localhost:5000/api/admin/addStudents`, student, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      Swal.fire({
        title: "Success!",
        text: "Student credentials added successfully",
        icon: "success",
        confirmButtonColor: "#3b82f6",
        timer: 2000,
      });
  
      // Reset form
      setStudent(initialStudentState);
      setErrors({});
      if (certificateIdRef.current) {
        certificateIdRef.current.focus();
      }
    } catch (error) {
      let errorMessage = "Failed to add student credentials";
  
      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = error.response.data.message || "Validation failed";
        } else if (error.response.status === 401) {
          errorMessage = "Authentication required. Please login.";
        } else if (error.response.status === 409) {
          errorMessage = `Certificate ID ${student.certificateID} already exists`;
        }
      } else if (error.request) {
        errorMessage = "No response from the server. Please try again later.";
      } else {
        errorMessage = "An unexpected error occurred. Please try again.";
      }
  
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        confirmButtonColor: "#3b82f6",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const departmentOptions = student.college 
    ? collegeDepartmentData[student.college] || []
    : [];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-center">
          <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-2">
              <span className="animate-bounce">🎓</span>
              Add Graduate Credentials
            </h2>
          </div>

          <div className="p-6 sm:p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Certificate ID */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Certificate ID *
                  </label>
                  <input
                    ref={certificateIdRef}
                    name="certificateID"
                    type="text"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.certificateID ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    value={student.certificateID}
                    onChange={handleChange}
                    placeholder="AB1234"
                    maxLength="6"
                  />
                  {errors.certificateID && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.certificateID}</p>
                  )}
                </div>

                {/* Name Fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    First Name *
                  </label>
                  <input
                    name="firstName"
                    type="text"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.firstName ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    value={student.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Middle Name *
                  </label>
                  <input
                    name="middleName"
                    type="text"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.middleName ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    value={student.middleName}
                    onChange={handleChange}
                  />
                  {errors.middleName && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.middleName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Last Name *
                  </label>
                  <input
                    name="lastName"
                    type="text"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.lastName ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    value={student.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.lastName}</p>
                  )}
                </div>

                {/* Academic Info */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    CGPA * <span className="text-xs text-gray-500 dark:text-gray-400">(1.75-4.00)</span>
                  </label>
                  <input
                    name="cgpa"
                    type="number"
                    step="0.01"
                    min="1.75"
                    max="4.00"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.cgpa ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    value={student.cgpa}
                    onChange={handleChange}
                  />
                  {errors.cgpa && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.cgpa}</p>
                  )}
                </div>

                {/* College and Department */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    College *
                  </label>
                  <select
                    name="college"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.college ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    value={student.college}
                    onChange={handleChange}
                  >
                    <option value="">Select College</option>
                    {Object.keys(collegeDepartmentData).map(college => (
                      <option key={college} value={college}>{college}</option>
                    ))}
                  </select>
                  {errors.college && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.college}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Department *
                  </label>
                  <select
                    name="department"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.department ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50`}
                    value={student.department}
                    onChange={handleChange}
                    disabled={!student.college}
                  >
                    <option value="">
                      {student.college ? "Select Department" : "Select College First"}
                    </option>
                    {departmentOptions.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                  {errors.department && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.department}</p>
                  )}
                </div>

                {/* Program and Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Program *
                  </label>
                  <select
                    name="program"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.program ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    value={student.program}
                    onChange={handleChange}
                  >
                    <option value="">Select Program</option>
                    <option value="BSc">BSc</option>
                    <option value="MSc">MSc</option>
                    <option value="PhD">PhD</option>
                  </select>
                  {errors.program && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.program}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Graduate Status *
                  </label>
                  <select
                    name="gstatus"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.gstatus ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    value={student.gstatus}
                    onChange={handleChange}
                  >
                    <option value="">Select Status</option>
                    <option value="Graduated">Graduated</option>
                    <option value="Pending">Pending</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                  {errors.gstatus && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.gstatus}</p>
                  )}
                </div>

                {/* Dates */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.startDate ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    value={student.startDate}
                    onChange={handleChange}
                  />
                  {errors.startDate && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.startDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    End Date *
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.endDate ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    value={student.endDate}
                    onChange={handleChange}
                    min={student.startDate}
                  />
                  {errors.endDate && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.endDate}</p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Gender *
                  </label>
                  <select
                    name="gender"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.gender ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    value={student.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.gender}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={!isFormComplete() || isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-white shadow-md transition-colors duration-200 ${
                    isFormComplete()
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Add Student Credentials"
                  )}
                </button>
                {!isFormComplete() && (
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">
                    Please fill all required fields to enable submission
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudentCredentials;