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
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-6">Search Graduate</h2>
      <form
        onSubmit={handleSearch}
        className="flex flex-col gap-4 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow"
      >
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="p-2 rounded border dark:bg-gray-700"
        />
        <input
          type="text"
          name="middleName"
          placeholder="Middle Name"
          value={formData.middleName}
          onChange={handleChange}
          className="p-2 rounded border dark:bg-gray-700"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="p-2 rounded border dark:bg-gray-700"
        />
        <input
          type="number"
          name="cgpa"
          placeholder="CGPA (1.75 - 4.00)"
          value={formData.cgpa}
          onChange={handleChange}
          step="0.01"
          className="p-2 rounded border dark:bg-gray-700"
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="p-2 rounded border dark:bg-gray-700"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="p-2 rounded border dark:bg-gray-700"
        >
          <option value="">Select Department</option>
          {departments.map((dept, index) => (
            <option key={index} value={dept}>{dept}</option>
          ))}
        </select>
        <div className="md:col-span-2 flex justify-center mt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default GraduateSearch;