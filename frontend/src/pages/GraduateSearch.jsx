import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const departments = [
  "Mechanical engineering",
  "Civil Engineering",
  "Electrical and Computer Engineering",
  "Computer Science",
  "Biology",
  "Chemistry",
  "Mathematics",
  "Physics",
  "Sport Science",
  "Geology",
  "Statistics",
  "Animal Science",
  "Agricultural Economics",
  "Natural Resources Management",
  "Soil Resource and Watershed Management",
  "Horticulture ",
  "General Forestry",
  "Veterinary Medicine  ",
  "Coffee science and Technology",
  " Accounting and Finance",
  "Banking and Finance",
  "Business and Economics",
  "Economics",
  "Marketing Management ",
  "Management",
  "Public Administration Management",
  "Hotel and Tourism Management",
  "Public Health Department",
  "Pharmacy Department",
  "Nursing Department",
  "Midwifery Department",
  "English Language and Literature Department",
  "Geography and Environmental Studies Department",
  "History and Heritage Management Department",
  "Special Needs and Inclusive Education Department",
  "Sociology Department",
  "Psychology Department",
  "Law Department",
  "Curriculum and Instruction Department",
  "Social Anthropology Department",
  "Political Science and International Relations Department",
];

const GraduateSearch = () => {
  const navigate = useNavigate();
  const [certificate, setCertificate] = useState(null);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    cgpa: "",
    department: "",
    gender: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setCertificate(null);
    console.log("Searching with:", formData);
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/certificates/name",
        { params: formData }
      );

      console.log(data);
      setCertificate(data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };
  const handleOpen = () => {
    if (certificate) {
      navigate(`/certificate/${certificate.certificateID}`);
    }
  };
  return (
<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12 overflow-x-hidden">
  <div className="w-full max-w-full md:max-w-7xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-8">
    <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-6">
      Search Graduate
    </h2>
    <form
      onSubmit={handleSearch}
      className="flex flex-col gap-8 w-full max-w-full md:max-w-4xl mx-auto py-4 px-4 md:px-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-lg md:text-2xl"
    >
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={(e) => {
          const value = e.target.value;
          if (/^[a-zA-Z]*$/.test(value)) {
            handleChange(e);
          }
        }}
        className="p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white"
        required
      />
      <input
        type="text"
        name="middleName"
        placeholder="Middle Name"
        value={formData.middleName}
        onChange={(e) => {
          const value = e.target.value;
          if (/^[a-zA-Z]*$/.test(value)) {
            handleChange(e);
          }
        }}
        className="p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white"
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={(e) => {
          const value = e.target.value;
          if (/^[a-zA-Z]*$/.test(value)) {
            handleChange(e);
          }
        }}
        className="p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white"
        required
      />
      <input
        type="number"
        name="cgpa"
        placeholder="CGPA (1.75 - 4.00)"
        value={formData.cgpa}
        onChange={(e) => {
          const value = e.target.value;
          if (value === "" || (parseFloat(value) >= 1.75 && parseFloat(value) <= 4.0)) {
            handleChange(e);
          }
        }}
        step="0.01"
        className="p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white"
        required
      />
      {formData.cgpa && (formData.cgpa < 1.75 || formData.cgpa > 4.0) && (
        <p className="text-red-600">CGPA must be between 1.75 and 4.00</p>
      )}

      <div className="flex flex-col md:flex-row gap-4">
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Department</option>
          {departments
            .sort((a, b) => a.localeCompare(b))
            .map((dept, index) => (
              <option key={index} value={dept}>
                {dept}
              </option>
            ))}
        </select>

        <select
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white"
          required
        >
          <option value="">Select End Date</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
      </div>
      <div className="flex justify-center mt-4">
        <button
          type="submit"
          className="w-full px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Search
        </button>
      </div>
    </form>

    {error && <p className="text-red-600 mt-4">{error}</p>}
    {certificate && (
 <div className="certificate-card bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8 text-gray-900 dark:text-white">
 <h3 className="text-xl md:text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
   Certificate Details
 </h3>
 <div className="space-y-2">
   <p className="text-lg">
     <strong className="font-semibold">ID:</strong> {certificate.certificateID}
   </p>
   <p className="text-lg">
     <strong className="font-semibold">Name:</strong> {certificate.firstName}
   </p>
 </div>
 <button
   onClick={handleOpen}
   className="cursor-pointer mt-6 w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition duration-300"
 >
   Open Certificate
 </button>
</div>
    )}
  </div>
</div>
  );
};

export default GraduateSearch;
