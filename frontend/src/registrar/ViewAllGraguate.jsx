import axios from 'axios';
import Swal from 'sweetalert2'; // 👈 import at the top

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewAllGraduate = () => {
  const [graduates, setGraduates] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGraduates = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/certificates", {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure the token is sent
          },
        });
        const data = await response.data;
        setGraduates(data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          Swal.fire({
            title: "Unauthorized",
            text: "Please log in to access this page.",
            icon: "error",
            confirmButtonText: "OK",
            background: "#1f2937",
            color: "#fff",
          });
          navigate("/registrar/login"); // Redirect to login page
        } else {
          console.error("Error fetching graduates:", error);
        }
      }
    };
    fetchGraduates();
  }, []);

  const handleUpdate = (certificateID) => {
    navigate(`/registrar/edit-graduate/${certificateID}`);
  };


  const handleDelete = async (certificateID) => {
    const token = localStorage.getItem('token');
  
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      background: '#1f2937', // dark mode background
      color: '#fff', // text color
    });
  
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/certificates/${certificateID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        Swal.fire({
          title: 'Deleted!',
          text: 'The graduate has been deleted.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          background: '#1f2937',
          color: '#fff',
        });
  
        // After delete: refresh the graduates list
        setGraduates(prev => prev.filter(g => g.certificateID !== certificateID));
      } catch (error) {
        console.error('Error deleting graduate:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete the graduate.',
          icon: 'error',
          background: '#1f2937',
          color: '#fff',
        });
      }
    }
  };
  

  return (
    <div className="p-6 max-w-4xl mx-auto text-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Registrar View Graduates</h2>
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

export default ViewAllGraduate;
