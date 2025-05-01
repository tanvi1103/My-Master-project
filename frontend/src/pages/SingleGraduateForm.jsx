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
        setErrorMessage(""); // Clear error if CGPA is valid
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
    setErrorMessage(""); // Reset error message
    alert("Graduate added successfully!");
    setGraduate(initialGraduateState); // Reset the form
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
    setFormValid(!result); // If there's no error, the form is valid
  }, [graduate]);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Add Graduate (Single)</h2>
      <form onSubmit={handleGraduateSubmit} className="grid md:grid-cols-2 gap-4 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <input name="firstName" placeholder="First Name" className="p-2 rounded border dark:bg-gray-700" value={graduate.firstName} onChange={handleGraduateChange} />
        <input name="middleName" placeholder="Middle Name" className="p-2 rounded border dark:bg-gray-700" value={graduate.middleName} onChange={handleGraduateChange} />
        <input name="lastName" placeholder="Last Name" className="p-2 rounded border dark:bg-gray-700" value={graduate.lastName} onChange={handleGraduateChange} />
        <input name="cgpa" type="number" step="0.01" placeholder="CGPA" className="p-2 rounded border dark:bg-gray-700" value={graduate.cgpa} onChange={handleGraduateChange} />
        <select name="college" className="p-2 rounded border dark:bg-gray-700" value={graduate.college} onChange={handleGraduateChange}>
          <option value="">Select College</option>
          {Object.keys(collegeDepartmentData).map((college) => (
            <option key={college} value={college}>{college}</option>
          ))}
        </select>
        <select name="department" className="p-2 rounded border dark:bg-gray-700" value={graduate.department} onChange={handleGraduateChange}>
          <option value="">Select Department</option>
          {departmentOptions.map((dept) => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
        <select name="gstatus" className="p-2 rounded border dark:bg-gray-700" value={graduate.gstatus} onChange={handleGraduateChange}>
          <option value="">Graduate Status</option>
          <option value="Graduated">Graduated</option>
          <option value="Pending">Pending</option>
          <option value="Suspended">Suspended</option>
        </select>
        <select name="program" className="p-2 rounded border dark:bg-gray-700" value={graduate.program} onChange={handleGraduateChange}>
          <option value="">Program</option>
          <option value="BSc">BSc</option>
          <option value="MSc">MSc</option>
          <option value="PhD">PhD</option>
        </select>
        <select name="gender" className="p-2 rounded border dark:bg-gray-700" value={graduate.gender} onChange={handleGraduateChange}>
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input type="date" name="startDate" className="p-2 rounded border dark:bg-gray-700" value={graduate.startDate} onChange={handleGraduateChange} />
        <input type="date" name="endDate" className="p-2 rounded border dark:bg-gray-700" value={graduate.endDate} onChange={handleGraduateChange} />
        {errorMessage && <div className="md:col-span-2 text-red-500 text-sm">{errorMessage}</div>}
        <div className="md:col-span-2 flex justify-center">
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50" disabled={!formValid}>
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default SingleGraduateForm;