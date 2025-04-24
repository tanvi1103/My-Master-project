import React, { useState } from "react";
import axios from "axios";
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
      
      console.log(data)
      setCertificate(data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12">
      <div className="w-full max-w-7xl  bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Search Graduate
        </h2>
        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-8 w-full max-w-4xl mx-auto py-4 px-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-2xl"
        >
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <input
            type="text"
            name="middleName"
            placeholder="Middle Name"
            value={formData.middleName}
            onChange={handleChange}
            className="p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <input
            type="number"
            name="cgpa"
            placeholder="CGPA (1.75 - 4.00)"
            value={formData.cgpa}
            onChange={handleChange}
            step="0.01"
            className="p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white"
          />
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
              className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Select Department</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <input
          type="text"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
          </div>
          <div className="flex justify-center mt-4 ">
            <button
              type="submit"
              className="w-full  px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
            >
              Search
            </button>
          </div>
        </form>
        {error && <p className="text-red-600 mt-4">{error}</p>}
      {certificate && (
        <div className="mt-6 bg-green-100 p-4 rounded">
          <h3 className="font-bold">Certificate Found</h3>
          <pre>{JSON.stringify(certificate, null, 2)}</pre>
        </div>
      )}
      </div>
    </div>
  );
};

export default GraduateSearch;
