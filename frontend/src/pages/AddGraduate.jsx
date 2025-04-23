import React, { useState } from 'react';

const AddGraduate = () => {
  const [graduate, setGraduate] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    cgpa: '',
    gender: '',
    department: '',
    college: '',
    program: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGraduate({ ...graduate, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cgpaVal = parseFloat(graduate.cgpa);
    if (cgpaVal < 1.75 || cgpaVal > 4.0) {
      alert('CGPA must be between 1.75 and 4.00');
      return;
    }
    console.log('Submitted Graduate:', graduate);
  };
  // flex min-h-screen bg-gray-100 dark:bg-gray-900
  return (
    <div className="p-6 min-h-screen b max-w-4xl mx-auto bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Add Graduate (Single)</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <input name="firstName" placeholder="First Name" className="p-2 rounded border dark:bg-gray-700" value={graduate.firstName} onChange={handleChange} />
        <input name="middleName" placeholder="Middle Name" className="p-2 rounded border dark:bg-gray-700" value={graduate.middleName} onChange={handleChange} />
        <input name="lastName" placeholder="Last Name" className="p-2 rounded border dark:bg-gray-700" value={graduate.lastName} onChange={handleChange} />
        <input name="cgpa" placeholder="CGPA" type="number" step="0.01" className="p-2 rounded border dark:bg-gray-700" value={graduate.cgpa} onChange={handleChange} />
        <select name="gender" className="p-2 rounded border dark:bg-gray-700" value={graduate.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input name="department" placeholder="Department" className="p-2 rounded border dark:bg-gray-700" value={graduate.department} onChange={handleChange} />
        <input name="college" placeholder="College" className="p-2 rounded border dark:bg-gray-700" value={graduate.college} onChange={handleChange} />
        <input name="program" placeholder="Graduate Program" className="p-2 rounded border dark:bg-gray-700" value={graduate.program} onChange={handleChange} />
        <div className="md:col-span-2 flex justify-center">
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Submit</button>
        </div>
      </form>

      <hr className="my-8" />

      <h2 className="text-2xl font-bold mb-4">Upload Graduates (.xlsx)</h2>
      <form className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <input type="file" accept=".xlsx" className="w-full p-2 rounded border dark:bg-gray-700" />
        <button type="button" className="mt-4 w-full px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">Upload</button>
      </form>
    </div>
  );
};

export default AddGraduate;