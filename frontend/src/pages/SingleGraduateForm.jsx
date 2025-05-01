import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";

const collegeDepartmentData = {
  "Engineering and Technology": ["Computer Science", "Mechanical Engineering", "Electrical Engineering", "Civil Engineering"],
  "Business and Economics": ["Accounting and Finance", "Banking and Finance", "Economics", "Marketing Management", "Management", "Public Administration", "Hotel and Tourism Management"],
  "Health Science": ["Nursing", "Pharmacy", "Public Health", "Midwifery"],
  "Social Science": ["English Language and Literature", "History and Heritage management", "Geography and Environmental studies", "Curriculum and Instruction", "Psychology", "Special Needs and Inclusive Education", "Law", "Sociology", "Civics and Ethical Studies", "Political Science and International Relations"],
  "Natural and Computational Science": ["Mathematics", "Physics", "Chemistry", "Biology", "Statistics", "Geology", "Sports Science"],
  "Agriculture and Natural Resource": ["Animal Science", "Agro economics", "Natural Resource Management", "soil and water conservation", "Horticulture", "Plant Science", "Forestry", "Veterinary Medicine", "Coffee Science and Technology"],
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

const SingleGraduateForm = () => {
  const [graduate, setGraduate] = useState(initialGraduateState);
  const [formValid, setFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firstNameRef = useRef(null);

  // Auto-focus first input on mount
  useEffect(() => {
    firstNameRef.current.focus();
  }, []);

  const handleGraduateChange = (e) => {
    const { name, value } = e.target;
    if (name === "college") {
      setGraduate({ ...graduate, college: value, department: "" });
    } else if (name === "cgpa") {
      const num = parseFloat(value);
      if (value === "" || (num >= 1.75 && num <= 4.0)) {
        setGraduate({ ...graduate, [name]: value });
        setErrorMessage("");
      } else {
        setErrorMessage("CGPA must be between 1.75 and 4.00");
      }
    } else {
      setGraduate({ ...graduate, [name]: value });
    }
  };

  const handleGraduateSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    Swal.fire({
      title: "Success!",
      text: "Graduate added successfully",
      icon: "success",
      confirmButtonColor: "#3b82f6",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });

    setGraduate(initialGraduateState);
    setIsSubmitting(false);
    firstNameRef.current.focus();
  };

  const departmentOptions = graduate.college ? collegeDepartmentData[graduate.college] || [] : [];

  const validateForm = (grad) => {
    if (!grad.firstName.trim()) return "First name is required";
    if (!nameRegex.test(grad.firstName)) return "First name can only contain letters, spaces, or hyphens";
    if (!grad.middleName.trim()) return "Middle name is required";
    if (!nameRegex.test(grad.middleName)) return "Middle name can only contain letters, spaces, or hyphens";
    if (!grad.lastName.trim()) return "Last name is required";
    if (!nameRegex.test(grad.lastName)) return "Last name can only contain letters, spaces, or hyphens";
    if (!grad.program.trim()) return "Program is required";
    if (!grad.gstatus) return "Graduate status is required";
    if (!grad.startDate || !grad.endDate) return "Start and end dates are required";
    if (grad.endDate < grad.startDate) return "End date must be after start date";
    if (!grad.college) return "College is required";
    if (!grad.department) return "Department is required";
    if (!grad.gender) return "Gender is required";
    if (!grad.cgpa) return "CGPA is required";

    const cgpaVal = parseFloat(grad.cgpa);
    if (isNaN(cgpaVal) || cgpaVal < 1.75 || cgpaVal > 4.0) return "CGPA must be between 1.75 and 4.00";
    return "";
  };

  useEffect(() => {
    const result = validateForm(graduate);
    setErrorMessage(result);
    setFormValid(!result);
  }, [graduate]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-center">
            <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-2">
              <span className="animate-bounce">🎓</span> 
              Add Graduate
            </h2>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8 md:p-10">
            <form onSubmit={handleGraduateSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Personal Info */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    First Name *
                  </label>
                  <input
                    ref={firstNameRef}
                    name="firstName"
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    value={graduate.firstName}
                    onChange={handleGraduateChange}
                    placeholder="Enter first name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Middle Name *
                  </label>
                  <input
                    name="middleName"
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    value={graduate.middleName}
                    onChange={handleGraduateChange}
                    placeholder="Enter middle name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Last Name *
                  </label>
                  <input
                    name="lastName"
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    value={graduate.lastName}
                    onChange={handleGraduateChange}
                    placeholder="Enter last name"
                  />
                </div>

                {/* Academic Info */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    CGPA * <span className="text-xs text-gray-500">(1.75-4.00)</span>
                  </label>
                  <input
                    name="cgpa"
                    type="number"
                    step="0.01"
                    min="1.75"
                    max="4.00"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    value={graduate.cgpa}
                    onChange={handleGraduateChange}
                    placeholder="Enter CGPA"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    College *
                  </label>
                  <select
                    name="college"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    value={graduate.college}
                    onChange={handleGraduateChange}
                  >
                    <option value="">Select College</option>
                    {Object.keys(collegeDepartmentData).map((college) => (
                      <option key={college} value={college}>{college}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Department *
                  </label>
                  <select
                    name="department"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50"
                    value={graduate.department}
                    onChange={handleGraduateChange}
                    disabled={!graduate.college}
                  >
                    <option value="">{graduate.college ? "Select Department" : "Select College First"}</option>
                    {departmentOptions.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                {/* Program Details */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Program *
                  </label>
                  <select
                    name="program"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    value={graduate.program}
                    onChange={handleGraduateChange}
                  >
                    <option value="">Select Program</option>
                    <option value="BSc">BSc</option>
                    <option value="MSc">MSc</option>
                    <option value="PhD">PhD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Graduate Status *
                  </label>
                  <select
                    name="gstatus"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    value={graduate.gstatus}
                    onChange={handleGraduateChange}
                  >
                    <option value="">Select Status</option>
                    <option value="Graduated">Graduated</option>
                    <option value="Pending">Pending</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>

                {/* Dates */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    value={graduate.startDate}
                    onChange={handleGraduateChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    End Date *
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    value={graduate.endDate}
                    onChange={handleGraduateChange}
                    min={graduate.startDate}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Gender *
                  </label>
                  <select
                    name="gender"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    value={graduate.gender}
                    onChange={handleGraduateChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="animate-shake p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400 text-sm font-medium">
                  ⚠️ {errorMessage}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={!formValid || isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-white shadow-md transition-all duration-300 ${
                    formValid 
                      ? 'bg-blue-600 hover:bg-blue-700 hover:scale-[1.02]'
                      : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                  } ${
                    isSubmitting ? 'opacity-75' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Submit Graduate'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleGraduateForm;