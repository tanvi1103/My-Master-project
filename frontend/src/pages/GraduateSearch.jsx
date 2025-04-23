import React, { useState } from 'react';

const departments = Array.from({ length: 42 }, (_, i) => `Department ${i + 1}`);

const GraduateSearch = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    cgpa: '',
    gender: '',
    department: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const cgpaFloat = parseFloat(formData.cgpa);
    if (cgpaFloat < 1.75 || cgpaFloat > 4.0) {
      alert('CGPA must be between 1.75 and 4.00');
      return;
    }
    console.log('Searching with:', formData);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12">
      <div className="w-full max-w-7xl  bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Search Graduate
        </h2>
        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-4 "
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
                <option key={index} value={dept}>{dept}</option>
              ))}
            </select>
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
      </div>
    </div>
  );
};

export default GraduateSearch;
