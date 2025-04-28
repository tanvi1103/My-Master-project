import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewUpdateGraduates = () => {
  const [graduates, setGraduates] = useState([]);
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGraduates = async () => {
      const response = await axios.get("http://localhost:5000/api/admin/certificates", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data;
      setGraduates(data);
    };
    fetchGraduates();
  }, []);

  const handleUpdate = (certificateID) => {
    navigate(`/admin/edit-graduate/${certificateID}`);
  };

  const handleDelete = (certificateID) => {
    navigate(`/admin/delete-graduate/${certificateID}`);
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
              <td className="p-2">{g.gstatus}</td>
              <td className="p-2">{new Date(g.endDate).getFullYear()}</td>
              <td className="p-2 flex space-x-2">
                <button
                  onClick={() => handleUpdate(g.certificateID)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(g.certificateID)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                >
                  Delete
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
