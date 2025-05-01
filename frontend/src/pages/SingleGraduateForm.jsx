import React, { useState, useEffect } from "react";

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

  const handleGraduateSubmit = (e) => {
    e.preventDefault();
    const error = validateForm(graduate);
    if (error) {
      setErrorMessage(error);
      return;
    }
    setErrorMessage("");
    alert("Graduate added successfully!");
    setGraduate(initialGraduateState);
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors duration-300">
          <div className="p-6 sm:p-8 md:p-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                🎓 Add Graduate
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Please fill in the details of the graduate
              </p>
            </div>

            <form onSubmit={handleGraduateSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {[
                  { name: "firstName", label: "First Name", type: "text" },
                  { name: "middleName", label: "Middle Name", type: "text" },
                  { name: "lastName", label: "Last Name", type: "text" },
                  { name: "cgpa", label: "CGPA", type: "number", step: "0.01" },
                ].map((input) => (
                  <div key={input.name}>
                    <label htmlFor={input.name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {input.label}
                    </label>
                    <input
                      id={input.name}
                      name={input.name}
                      type={input.type}
                      step={input.step}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      value={graduate[input.name]}
                      onChange={handleGraduateChange}
                      placeholder={`Enter ${input.label.toLowerCase()}`}
                    />
                  </div>
                ))}

                <div>
                  <label htmlFor="college" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    College
                  </label>
                  <select
                    id="college"
                    name="college"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
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
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Department
                  </label>
                  <select
                    id="department"
                    name="department"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    value={graduate.department}
                    onChange={handleGraduateChange}
                    disabled={!graduate.college}
                  >
                    <option value="">Select Department</option>
                    {departmentOptions.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="gstatus" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Graduate Status
                  </label>
                  <select
                    id="gstatus"
                    name="gstatus"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    value={graduate.gstatus}
                    onChange={handleGraduateChange}
                  >
                    <option value="">Select Status</option>
                    <option value="Graduated">Graduated</option>
                    <option value="Pending">Pending</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="program" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Program
                  </label>
                  <select
                    id="program"
                    name="program"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
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
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    value={graduate.gender}
                    onChange={handleGraduateChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Start Date
                  </label>
                  <input
                    id="startDate"
                    type="date"
                    name="startDate"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    value={graduate.startDate}
                    onChange={handleGraduateChange}
                  />
                </div>

                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    End Date
                  </label>
                  <input
                    id="endDate"
                    type="date"
                    name="endDate"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    value={graduate.endDate}
                    onChange={handleGraduateChange}
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400 text-sm font-medium">
                  {errorMessage}
                </div>
              )}

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className={`px-8 py-3 rounded-lg font-semibold text-white shadow-md transition-colors duration-300 ${formValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'}`}
                  disabled={!formValid}
                >
                  Submit Graduate
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