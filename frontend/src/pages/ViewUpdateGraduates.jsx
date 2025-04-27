import axios from 'axios';
import React, { useState, useEffect } from 'react';

const ViewUpdateGraduates = () => {
  const [graduates, setGraduates] = useState([]);

  useEffect(() => {
    const fetchGraduates = async () => {
      const response = await axios.get("http://localhost:5000/api/admin/certificates");
      const data = await response.data;
      setGraduates(data);
    };
    fetchGraduates();
  }, []);

  const handleUpdate = (id) => {
    console.log('Updating graduate with id:', id);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Admin View Graduates</h2>
      <table className="min-w-full table-auto bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
        <thead>
          <tr>
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">First Name</th>
            <th className="p-2 text-left">Middle Name</th>
            <th className="p-2 text-left">Last Name</th>
            <th className="p-2 text-left">CGPA</th>
            <th className="p-2 text-left">Gender</th>
            <th className="p-2 text-left">Department</th>
            <th className="p-2 text-left">College</th>
            <th className="p-2 text-left">Program</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Gr. year</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {graduates.map((g) => (
            <tr key={g.certificateID} className="border-t border-gray-300 dark:border-gray-700">
              <td className="p-2">{g.certificateID}</td>
              <td className="p-2">{g.firstName}</td>
              <td className="p-2">{g.middleName}</td>
              <td className="p-2">{g.lastName}</td>
              <td className="p-2">{g.cgpa}</td>
              <td className="p-2">{g.gender}</td>
              <td className="p-2">{g.department}</td>
              <td className="p-2">{g.college}</td>
              <td className="p-2">{g.program}</td>
              <td className="p-2">{g.status}</td>
              <td className="p-2">{new Date(g.endDate).getFullYear()}</td>
              <td className="p-2 flex space-x-2">
                <button
                  onClick={() => handleUpdate(g.id)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 cursor-pointer"
                >
                  Update
                </button>
                <button
                  onClick={() => handleUpdate(g.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewUpdateGraduates;